const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    jobName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
    },
    JobRole: {
      type: String,
      required: true,
    },
    Stipend: {
      type: Number,
    },
    PPO: {
      type: String,
    },
    JobLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", JobSchema);
