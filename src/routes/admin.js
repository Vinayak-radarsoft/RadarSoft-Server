const express = require("express");
const {
  CreateUsers,
  LoginUser,
  getAppoinmentList,
  getCareerList,
  deleteCareers,
  deleteAppointment,
  createJobPost,
  getJobList,
  deleteJobPost,
  getContactList,
  deleteContact,
  updateJobPost,
  SingleJobPost,
  updateJobStatus,
} = require("../controller/admin/admin");
const { isValidAdmin } = require("../middleware/admin-verify");
const router = express.Router();

router.post("/", CreateUsers);
router.post("/login", LoginUser);
router.get("/appoinment", isValidAdmin, getAppoinmentList);
router.delete("/appoinment/:id", isValidAdmin, deleteAppointment);
router.get("/career", isValidAdmin, getCareerList);
router.delete("/career/:id", isValidAdmin, deleteCareers);
router.post("/job", isValidAdmin, createJobPost);
router.get("/job", isValidAdmin, getJobList);
router.patch("/job/update/:id", isValidAdmin, updateJobPost);
router.patch("/job/status/update/:id", isValidAdmin, updateJobStatus);
router.get("/job/single/:id", isValidAdmin, SingleJobPost);
router.delete("/job/:id", isValidAdmin, deleteJobPost);
router.get("/contact", isValidAdmin, getContactList);
router.delete("/contact/:id", isValidAdmin, deleteContact);

module.exports = router;
