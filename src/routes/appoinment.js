const express = require("express");
const { AppoinmentPost } = require("../controller/appoinment");
const router = express.Router();

router.post("/appoinment", AppoinmentPost);

module.exports = router;