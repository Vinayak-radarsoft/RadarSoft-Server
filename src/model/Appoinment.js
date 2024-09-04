const { Schema, model } = require("mongoose");

const ApplicantSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    subject: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ApplicantModel = model("Appoinment", ApplicantSchema);
module.exports = ApplicantModel;
