const CareerModel = require("../model/Careers");
const JobPostModel = require("../model/Job");
const uploadFile = require("../utils/file");

const createCareer = async (req, res) => {
  try {
    const { name, jobTitle, phoneNumber, email, currentCTC, expectedCTC } =
      req.body;
    const resume = req.files ? req.files.resume : null;
    console.log("req.body", req.body, resume);
    let resumeURL = "";
    if (resume) {
      const mimeType = resume.mimetype;
      const supportedImageTypes = ["image/jpeg", "image/png", "image/gif"];
      const supportedDocumentTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (
        supportedImageTypes.includes(mimeType) ||
        supportedDocumentTypes.includes(mimeType)
      ) {
        resumeURL = await uploadFile(resume, resume.data);
      } else {
        console.log(`Unsupported file type: ${mimeType}`);
        return res.status(400).json({ message: "Unsupported file type." });
      }
    }
    const newCareer = new CareerModel({
      name,
      phoneNumber: req.body?.phone,
      email,
      currentCTC: req.body?.currentCtc,
      expectedCTC: req.body?.expectedCtc,
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

const getJobList = async (req, res, next) => {
  try {
    const jobs = await JobPostModel.find({ active: true });
    if (jobs.length === 0) {
      return res.status(404).json({ msg: "Data not found." });
    }
    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

const getCareer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("career", id);
    const career = await JobPostModel.findById(id);
    if (!career) {
      return res
        .status(404)
        .json({ success: false, message: "Career not found" });
    }

    return res.status(200).json({ success: true, data: career });
  } catch (error) {
    console.error("Error fetching career:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createCareer, getJobList, getCareer };
