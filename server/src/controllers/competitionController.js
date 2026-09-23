const competitionService = require('../services/competitionService');
const Competition = require('../models/Competition');

class CompetitionController {
  /**
   * GET /api/competitions
   * List all competitions
   */
  async getAllCompetitions(req, res, next) {
    try {
      const competitions = await Competition.find().select('title category tags prizePool entryFee maxParticipants bookedSpots registrationDeadline status').lean();
      res.json({
        success: true,
        count: competitions.length,
        data: competitions,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/demo-users
   * Return demo users for evaluation state switching
   */
  async getDemoUsers(req, res, next) {
    try {
      const User = require('../models/User');
      const users = await User.find().lean();
      res.json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id
   * Get single competition details with dynamic lifecycle & user participation status
   */
  async getCompetitionById(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.query;

      const competition = await competitionService.getCompetitionDetails(id, userId);
      res.json({
        success: true,
        data: competition,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id/availability
   * Real-time spots, booked ratio, and countdown
   */
  async getAvailability(req, res, next) {
    try {
      const { id } = req.params;
      const availability = await competitionService.getAvailability(id);
      res.json({
        success: true,
        data: availability,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id/winners
   * Previous winners list
   */
  async getPreviousWinners(req, res, next) {
    try {
      const { id } = req.params;
      const winners = await competitionService.getPreviousWinners(id);
      res.json({
        success: true,
        count: winners.length,
        data: winners,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id/reviews
   * Participant reviews & testimonials
   */
  async getReviews(req, res, next) {
    try {
      const { id } = req.params;
      const reviews = await competitionService.getReviews(id);
      res.json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id/rewards
   * Rewards list
   */
  async getRewards(req, res, next) {
    try {
      const { id } = req.params;
      const rewards = await competitionService.getRewards(id);
      res.json({
        success: true,
        data: rewards,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CompetitionController();
