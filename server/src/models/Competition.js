const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Competition title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Dance',
    },
    tags: {
      type: [String],
      default: ['Dance', 'Multi-Win'],
    },
    winnerCertificate: {
      type: String,
      default: 'Winners get certificate',
    },
    prizePool: {
      type: Number,
      required: true,
      min: 0,
      default: 1500,
    },
    entryFee: {
      type: Number,
      required: true,
      min: 0,
      default: 99,
    },
    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
      default: 20,
    },
    bookedSpots: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    registrationDeadline: {
      type: Date,
      required: [true, 'Registration deadline is required'],
    },
    submissionStart: {
      type: Date,
      required: [true, 'Submission start date is required'],
    },
    submissionEnd: {
      type: Date,
      required: [true, 'Submission end date is required'],
    },
    resultDate: {
      type: Date,
      required: [true, 'Result announcement date is required'],
    },
    judge: {
      name: { type: String, required: true },
      title: { type: String, required: true },
      experience: { type: String, required: true },
      avatarUrl: { type: String },
      introVideoUrl: { type: String },
      bio: { type: String },
    },
    about: {
      shortDescription: { type: String, required: true },
      fullDescription: { type: String, required: true },
    },
    judgingParameters: [
      {
        title: { type: String, required: true },
        weightage: { type: String },
        description: { type: String, required: true },
      },
    ],
    rulesAndEligibility: [
      {
        title: { type: String, required: true },
        rule: { type: String, required: true },
      },
    ],
    rewards: [
      {
        position: { type: Number, required: true },
        title: { type: String, required: true },
        amount: { type: Number, required: true },
        iconType: {
          type: String,
          enum: ['gold', 'silver', 'bronze', 'star'],
          default: 'star',
        },
      },
    ],
    disclaimer: {
      type: String,
      default: 'Only contributions from paid participants will be considered for judging.',
    },
    prizeMoneyInfo: {
      title: { type: String, default: 'How will you receive prize money?' },
      subtitle: { type: String, default: 'Watch video to know more' },
      videoUrl: { type: String },
      description: {
        type: String,
        default: 'Prize money is disbursed directly via UPI or Bank Transfer within 48 hours of result verification.',
      },
    },
    referralProgram: {
      headline: { type: String, default: 'Refer & Earn more discount' },
      rewardPerSignup: { type: Number, default: 10 },
      rewardText: { type: String, default: 'You earn ₹10 for every signup' },
      referralBaseUrl: { type: String, default: 'https://feedants.com/r/' },
    },
    refundPolicy: {
      title: { type: String, default: 'Refund policy' },
      terms: [String],
    },
    paymentGateway: {
      provider: { type: String, default: 'Razorpay' },
      badgeText: { type: String, default: 'Secure payments powered by' },
      isTestMode: { type: Boolean, default: true },
    },
    status: {
      type: String,
      enum: [
        'UPCOMING',
        'REGISTRATION_OPEN',
        'REGISTRATION_CLOSED',
        'SUBMISSION_OPEN',
        'SUBMISSION_CLOSED',
        'RESULT_DECLARED',
        'ENDED',
      ],
      default: 'REGISTRATION_OPEN',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for fast lookup and sorting
CompetitionSchema.index({ status: 1 });
CompetitionSchema.index({ registrationDeadline: 1 });

module.exports = mongoose.model('Competition', CompetitionSchema);
