const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema(
  {
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Performance title is required'],
      trim: true,
    },
    danceStyle: {
      type: String,
      default: 'Classical / Kathak',
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL or submission link is required'],
    },
    fileName: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'],
      default: 'SUBMITTED',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// One active submission per user per competition
SubmissionSchema.index({ competitionId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
