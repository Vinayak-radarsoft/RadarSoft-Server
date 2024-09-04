const ApplicantModel = require("../model/Appoinment");

const AppoinmentPost = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, subject } = req.body;

        if (!fullName || !phoneNumber || !email || !subject) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newApplicant = new ApplicantModel({
            fullName,
            phoneNumber,
            email,
            subject,
        });
        await newApplicant.save();
        return res.status(201).json({ data: newApplicant });
    } catch (error) {
        console.error("Error creating applicant:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { AppoinmentPost };
