const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const registrationController = require('../controllers/registrationController');
const submissionController = require('../controllers/submissionController');
const { validateObjectId } = require('../middleware/validate');

// Competitions list
router.get('/', competitionController.getAllCompetitions);

// Demo users for evaluator switching
router.get('/demo-users', competitionController.getDemoUsers);

// Single competition details
router.get('/:id', validateObjectId('id'), competitionController.getCompetitionById);

// Real-time capacity & spots availability
router.get('/:id/availability', validateObjectId('id'), competitionController.getAvailability);

// Previous winners
router.get('/:id/winners', validateObjectId('id'), competitionController.getPreviousWinners);

// Participant reviews / testimonials
router.get('/:id/reviews', validateObjectId('id'), competitionController.getReviews);

// Rewards breakdown
router.get('/:id/rewards', validateObjectId('id'), competitionController.getRewards);

// User dynamic participation status
router.get('/:id/participation', validateObjectId('id'), registrationController.getParticipation);

// Atomic registration
router.post('/:id/register', validateObjectId('id'), registrationController.register);

// Dance submission upload
router.post('/:id/submission', validateObjectId('id'), submissionController.submit);
router.get('/:id/submission', validateObjectId('id'), submissionController.getUserSubmission);

// Dynamic referral link info
router.get('/:id/referral', validateObjectId('id'), registrationController.getReferralInfo);

module.exports = router;
