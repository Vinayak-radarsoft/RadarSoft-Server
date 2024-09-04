const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
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
        country: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const ContactModel = model("Contact", ContactSchema);
module.exports = ContactModel;
