const express = require("express");
const { createCareer, getJobList, getCareer } = require("../controller/career");
const router = express.Router();

router.post("/career", createCareer);
router.get("/job/list", getJobList);
router.get("/career/:id", getCareer);

module.exports = router;
