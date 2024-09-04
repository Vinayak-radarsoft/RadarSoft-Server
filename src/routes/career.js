const express = require("express");
const { createCareer } = require("../controller/career");
const router = express.Router();

router.post("/career", createCareer);

module.exports = router;