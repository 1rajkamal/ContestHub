const competitionService = require('../services/competitionService');
const Submission = require('../models/Submission');

class SubmissionController {
  /**
   * POST /api/competitions/:id/submission
   * Upload video submission for registered participant
   */
  async submit(req, res, next) {
    try {
      const { id: competitionId } = req.params;
      const { userId, title, danceStyle, videoUrl, notes, fileName, fileSize } = req.body;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'userId is required for submitting an entry',
        });
      }

      if (!title || !title.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Performance title is required',
        });
      }

      if (!videoUrl || !videoUrl.trim()) {
        return res.status(400).json({
          success: false,
          error: 'Video link or file submission is required',
        });
      }

      const submission = await competitionService.submitEntry({
        competitionId,
        userId,
        title: title.trim(),
        danceStyle: danceStyle || 'Classical / Kathak',
        videoUrl: videoUrl.trim(),
        notes: notes ? notes.trim() : '',
        fileName,
        fileSize,
      });

      return res.status(201).json({
        success: true,
        message: 'Submission uploaded successfully and queued for judging evaluation',
        data: submission,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/competitions/:id/submission?userId=...
   * Retrieve submission for user
   */
  async getUserSubmission(req, res, next) {
    try {
      const { id: competitionId } = req.params;
      const { userId } = req.query;

      if (!userId) {
        return res.status(400).json({
          success: false,
          error: 'userId query parameter is required',
        });
      }

      const submission = await Submission.findOne({ competitionId, userId });
      return res.json({
        success: true,
        data: submission,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SubmissionController();
