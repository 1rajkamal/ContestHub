const registrationService = require('../services/registrationService');
const User = require('../models/User');

class RegistrationController {
  /**
   * POST /api/competitions/:id/register
   * Atomic, concurrency-safe registration endpoint
   */
  async register(req, res, next) {
    try {
      const { id: competitionId } = req.params;
      const { userId, paymentDetails } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'User ID is required for registration',
        });
      }

      const result = await registrationService.registerUserForCompetition({
        competitionId,
        userId,
        paymentDetails,
      });

      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id/participation?userId=...
   * Check dynamic registration & submission state
   */
  async getParticipation(req, res, next) {
    try {
      const { id: competitionId } = req.params;
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'userId query parameter is required',
        });
      }

      const status = await registrationService.checkUserParticipation(competitionId, userId);
      return res.json({
        success: true,
        data: status,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id/referral?userId=...
   * Generate/retrieve dynamic referral link for user
   */
  async getReferralInfo(req, res, next) {
    try {
      const { id: competitionId } = req.params;
      const { userId } = req.query;

      let referralCode = 'referral123';
      if (userId) {
        const user = await User.findById(userId);
        if (user && user.referralCode) {
          referralCode = user.referralCode;
        }
      }

      const referralLink = `https://feedants.com/r/${referralCode}`;

      return res.json({
        success: true,
        data: {
          referralCode,
          referralLink,
          headline: 'Refer & Earn more discount',
          rewardText: 'You earn ₹10 for every signup',
          rewardAmount: 10,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new RegistrationController();
