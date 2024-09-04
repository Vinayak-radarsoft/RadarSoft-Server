const ContactModel = require("../model/Contact");

const ContactPost = async (req, res) => {
    try {
        const { name, phoneNumber, email, country, message } = req.body;
        const newContact = new ContactModel({
            name,
            phoneNumber,
            email,
            country,
            message,
        });
        const savedContact = await newContact.save();
        return res.status(201).json({ data: savedContact });
    } catch (error) {
        console.error("Error creating contact:", error);
        return res
            .status(500)
            .json({ error: "An error occurred while creating the contact." });
    }
};

module.exports = { ContactPost };
