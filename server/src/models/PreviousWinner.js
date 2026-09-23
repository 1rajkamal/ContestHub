const mongoose = require('mongoose');

const PreviousWinnerSchema = new mongoose.Schema(
  {
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competition',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true, // e.g. "1st Winner", "2nd Winner"
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    danceStyle: {
      type: String,
      default: 'Classical Dance',
    },
    rankOrder: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

PreviousWinnerSchema.index({ competitionId: 1, rankOrder: 1 });

module.exports = mongoose.model('PreviousWinner', PreviousWinnerSchema);
