const { JsonWebToken } = require("../../libs");
const ApplicantModel = require("../../model/Appoinment");
const CareerModel = require("../../model/Careers");
const ContactModel = require("../../model/Contact");
const JobPostModel = require("../../model/Job");
const UserModel = require("../../model/Users");
const bcrypt = require("bcryptjs");

//users api
const CreateUsers = async (req, res, next) => {
  try {
    const { fullName, password, email, role } = req.body;
    const isExists = await UserModel.exists({ email });
    if (isExists) {
      return res
        .status(409)
        .json({ message: "User already exists with the same email" });
    }
    const newUser = new UserModel({
      fullName,
      email,
      password,
      role,
    });
    await newUser.save();
    return res.json({ user: newUser });
  } catch (error) {
    next(error);
  }
};

const LoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("login details.", email, password);
    const isExists = await UserModel.findOne({ email });
    if (!isExists) {
      return res
        .status(404)
        .json({ message: "User not found with this email." });
    }
    const isMatched = await bcrypt.compare(password, isExists.password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid password." });
    }
    const AccessToken = await JsonWebToken.signToken({
      _id: isExists._id,
      role: isExists.role,
    });
    const RefreshToken = await JsonWebToken.signRefreshToken({
      _id: isExists._id,
      role: isExists.role,
    });

    return res.status(200).json({
      message: "User login successfully!",
      token: AccessToken,
      RefreshToken: RefreshToken,
    });
  } catch (error) {
    console.log("error in login.", error);
    next(error);
  }
};

//appoinment api
const getAppoinmentList = async (req, res, next) => {
  try {
    const appointments = await ApplicantModel.find({}).sort({ createdAt: -1 });
    if (appointments.length === 0) {
      return res.status(404).json({ msg: "Data not found." });
    }
    return res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await ApplicantModel.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//career api
const getCareerList = async (req, res, next) => {
  try {
    const careers = await CareerModel.find({}).sort({ createdAt: -1 });
    if (careers.length === 0) {
      return res.status(404).json({ msg: "Data not found." });
    }
    return res.status(200).json({
      success: true,
      data: careers,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCareers = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("delete career", id);
    const deletedCareers = await CareerModel.findByIdAndDelete(id);
    if (!deletedCareers) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//contact api
const getContactList = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find({}).sort({ createdAt: -1 });
    if (contacts.length === 0) {
      return res.status(404).json({ msg: "Data not found." });
    }
    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("delete career", id);
    const deletedContacts = await ContactModel.findByIdAndDelete(id);
    if (!deletedContacts) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Career deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//job post api
const createJobPost = async (req, res, next) => {
  try {
    const jobPost = new JobPostModel({
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      Jobtype: req.body.jobType.value,
      experience: req.body.experience,
      skills: req.body.skills,
    });
    await jobPost.save();
    return res.status(201).json({
      success: true,
      data: jobPost,
    });
  } catch (error) {
    next(error);
  }
};
const getJobList = async (req, res, next) => {
  try {
    const jobs = await JobPostModel.find({}).sort({ createdAt: -1 });
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
const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJobPost = await JobPostModel.findByIdAndDelete(id);

    if (!deletedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
const updateJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedJobPost = await JobPostModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        Jobtype: req.body.jobType.value,
        experience: req.body.experience,
      },
      {
        new: true,
      }
    );

    if (!updatedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedJobPost,
    });
  } catch (error) {
    next(error);
  }
};
const updateJobStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    console.log("status updated", id, active);
    const updatedJobPost = await JobPostModel.findByIdAndUpdate(
      id,
      { active },
      {
        new: true,
      }
    );

    if (!updatedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedJobPost,
    });
  } catch (error) {
    next(error);
  }
};
const SingleJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedJobPost = await JobPostModel.findById(id);
    if (!updatedJobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedJobPost,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateUsers,
  LoginUser,
  getCareerList,
  getAppoinmentList,
  deleteAppointment,
  deleteCareers,
  createJobPost,
  getJobList,
  updateJobPost,
  deleteJobPost,
  deleteContact,
  getContactList,
  SingleJobPost,
  updateJobStatus,
};
