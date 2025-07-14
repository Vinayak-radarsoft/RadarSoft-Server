const { Schema, model } = require("mongoose");

const JobPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    Jobtype: {
      type: String, // Full-time, Part-time, Contract, etc.
    },
  },
  {
    timestamps: true,
  }
);

const JobPostModel = model("JobPost", JobPostSchema);
module.exports = JobPostModel;
