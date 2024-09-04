const { Schema, model } = require("mongoose");

const CareerSchema = new Schema(
    {
        name: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        email: {
            type: String,
        },
        currentCTC: {
            type: String,
        },
        expectedCTC: {
            type: String,
        },
        jobTitle: {
            type: String,
        },
        resume: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const CareerModel = model("Career", CareerSchema);
module.exports = CareerModel;
