const CareerModel = require("../model/Careers");
const uploadFile = require("../utils/file");

const createCareer = async (req, res) => {
    try {
        const { name,jobTitle, phoneNumber, email, currentCTC, expectedCTC } = req.body;
        const resume = req.files ? req.files.resume : null;
        console.log("req.body", req.body, resume);
        let resumeURL = "";
        if (resume) {
            if (resume.mimetype.startsWith("image/")) {
                resumeURL = await uploadFile(resume, resume.data);
            } else if (resume.mimetype === "application/pdf") {
                resumeURL = await uploadFile(resume, resume.data);
            } else {
                console.log(`Unsupported file type: ${resume.mimetype}`);
                return res.status(400).json({ message: "Unsupported file type." });
            }
        }
        const newCareer = new CareerModel({
            name,
            phoneNumber,
            email,
            currentCTC,
            expectedCTC,
            jobTitle,
            resume: resumeURL,
        });
        await newCareer.save();
        console.log("newCareer", newCareer);
        return res.status(201).json({ data: newCareer });
    } catch (error) {
        console.error("Error creating career:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createCareer };
