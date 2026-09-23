const mongoose = require('mongoose');
const Competition = require('../models/Competition');
const PreviousWinner = require('../models/PreviousWinner');
const Review = require('../models/Review');
const Submission = require('../models/Submission');
const Registration = require('../models/Registration');
const { computeCompetitionLifecycle } = require('../utils/lifecycleHelper');

class CompetitionService {
  /**
   * Retrieves full competition details with dynamic lifecycle metadata
   */
  async getCompetitionDetails(competitionId, userId = null) {
    const competition = await Competition.findById(competitionId).lean();
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    const lifecycle = computeCompetitionLifecycle(competition);

    let userParticipation = {
      isRegistered: false,
      hasSubmitted: false,
      registration: null,
      submission: null,
    };

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const registration = await Registration.findOne({ competitionId, userId }).lean();
      if (registration) {
        userParticipation.isRegistered = true;
        userParticipation.registration = registration;

        const submission = await Submission.findOne({ competitionId, userId }).lean();
        if (submission) {
          userParticipation.hasSubmitted = true;
          userParticipation.submission = submission;
        }
      }
    }

    return {
      ...competition,
      lifecycle,
      userParticipation,
    };
  }

  /**
   * Get availability and spots metrics
   */
  async getAvailability(competitionId) {
    const competition = await Competition.findById(competitionId, 'maxParticipants bookedSpots registrationDeadline status').lean();
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    const lifecycle = computeCompetitionLifecycle(competition);

    return {
      competitionId,
      maxParticipants: competition.maxParticipants,
      bookedSpots: competition.bookedSpots,
      remainingSpots: lifecycle.remainingSpots,
      bookedRatio: lifecycle.bookedRatio,
      isFull: lifecycle.isFull,
      isRegistrationOpen: lifecycle.isRegistrationOpen,
      registrationDeadline: competition.registrationDeadline,
      remainingRegistrationMs: lifecycle.remainingRegistrationMs,
      serverTimestamp: lifecycle.serverTimestamp,
    };
  }

  /**
   * Get previous winners for the competition
   */
  async getPreviousWinners(competitionId) {
    return PreviousWinner.find({ competitionId }).sort({ rankOrder: 1 }).lean();
  }

  /**
   * Get participant reviews & testimonials
   */
  async getReviews(competitionId) {
    return Review.find({ competitionId }).sort({ createdAt: -1 }).lean();
  }

  /**
   * Get rewards breakdown
   */
  async getRewards(competitionId) {
    const competition = await Competition.findById(competitionId, 'rewards prizePool').lean();
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }
    return {
      prizePool: competition.prizePool,
      rewards: competition.rewards,
    };
  }

  /**
   * Create submission for registered user
   */
  async submitEntry({ competitionId, userId, title, danceStyle, videoUrl, notes, fileName, fileSize }) {
    // 1. Must be registered
    const registration = await Registration.findOne({ competitionId, userId });
    if (!registration) {
      const error = new Error('You must be registered for this competition before uploading a submission');
      error.statusCode = 403;
      error.code = 'NOT_REGISTERED';
      throw error;
    }

    // 2. Validate competition dates
    const competition = await Competition.findById(competitionId);
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }

    const now = new Date();
    if (now < new Date(competition.submissionStart)) {
      const error = new Error('Submission window has not opened yet');
      error.statusCode = 400;
      error.code = 'SUBMISSION_NOT_STARTED';
      throw error;
    }

    if (now > new Date(competition.submissionEnd)) {
      const error = new Error('Submission deadline has passed');
      error.statusCode = 400;
      error.code = 'SUBMISSION_DEADLINE_PASSED';
      throw error;
    }

    // 3. Upsert / record submission
    const submission = await Submission.findOneAndUpdate(
      { competitionId, userId },
      {
        title,
        danceStyle: danceStyle || 'Classical / Kathak',
        videoUrl,
        notes,
        fileName,
        fileSize,
        submittedAt: now,
        status: 'SUBMITTED',
      },
      { new: true, upsert: true, runValidators: true }
    );

    return submission;
  }
}

module.exports = new CompetitionService();
