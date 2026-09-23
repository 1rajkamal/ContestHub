const Competition = require('../models/Competition');
const Registration = require('../models/Registration');
const User = require('../models/User');

class RegistrationService {
  /**
   * Concurrency-safe atomic registration with capacity protection
   * and duplicate registration prevention.
   */
  async registerUserForCompetition({ competitionId, userId, paymentDetails }) {
    // 1. Verify User exists
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    // 2. Pre-check if competition exists
    const compCheck = await Competition.findById(competitionId);
    if (!compCheck) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    // 3. Pre-check if user is already registered
    const existingRegistration = await Registration.findOne({ competitionId, userId });
    if (existingRegistration) {
      const error = new Error('User is already registered for this competition');
      error.statusCode = 409;
      error.registration = existingRegistration;
      throw error;
    }

    const now = new Date();

    // 4. ATOMIC CONDITIONAL CAPACITY RESERVATION
    // The query condition strictly checks that bookedSpots < maxParticipants
    // and registrationDeadline > now in a single atomic database operation.
    const updatedCompetition = await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        $expr: { $lt: ['$bookedSpots', '$maxParticipants'] },
        registrationDeadline: { $gt: now },
        status: { $nin: ['ENDED', 'REGISTRATION_CLOSED'] },
      },
      {
        $inc: { bookedSpots: 1 },
      },
      {
        new: true,
      }
    );

    // If no document was updated, determine the exact constraint violation
    if (!updatedCompetition) {
      const freshComp = await Competition.findById(competitionId);
      if (!freshComp) {
        const error = new Error('Competition not found');
        error.statusCode = 404;
        throw error;
      }

      if (now >= new Date(freshComp.registrationDeadline)) {
        const error = new Error('Registration deadline has passed');
        error.statusCode = 400;
        error.code = 'DEADLINE_PASSED';
        throw error;
      }

      if (freshComp.bookedSpots >= freshComp.maxParticipants) {
        const error = new Error('Competition has reached maximum participant capacity (Full)');
        error.statusCode = 400;
        error.code = 'CAPACITY_REACHED';
        throw error;
      }

      const error = new Error('Registration is currently not open for this competition');
      error.statusCode = 400;
      error.code = 'REGISTRATION_NOT_OPEN';
      throw error;
    }

    // 5. Insert registration record with simulated payment
    const paymentId =
      paymentDetails?.paymentId ||
      `pay_razor_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    try {
      const registration = await Registration.create({
        competitionId,
        userId,
        paymentStatus: 'COMPLETED',
        paymentId,
        amountPaid: updatedCompetition.entryFee,
        registeredAt: now,
      });

      return {
        success: true,
        message: 'Successfully registered for the competition',
        registration,
        bookedSpots: updatedCompetition.bookedSpots,
        remainingSpots: updatedCompetition.maxParticipants - updatedCompetition.bookedSpots,
        maxParticipants: updatedCompetition.maxParticipants,
      };
    } catch (dbErr) {
      // If a race condition caused duplicate entry, unique compound index triggers 11000
      if (dbErr.code === 11000) {
        // Roll back the atomic increment compensation
        await Competition.findByIdAndUpdate(competitionId, { $inc: { bookedSpots: -1 } });
        const error = new Error('User is already registered for this competition');
        error.statusCode = 409;
        throw error;
      }

      // Rollback atomic spot reservation on any other failure
      await Competition.findByIdAndUpdate(competitionId, { $inc: { bookedSpots: -1 } });
      throw dbErr;
    }
  }

  /**
   * Check participation status for a specific user and competition
   */
  async checkUserParticipation(competitionId, userId) {
    if (!userId) {
      return { isRegistered: false, hasSubmitted: false };
    }

    const registration = await Registration.findOne({ competitionId, userId });
    const isRegistered = Boolean(registration);

    let submission = null;
    if (isRegistered) {
      const Submission = require('../models/Submission');
      submission = await Submission.findOne({ competitionId, userId });
    }

    return {
      isRegistered,
      registration,
      hasSubmitted: Boolean(submission),
      submission,
    };
  }
}

module.exports = new RegistrationService();
