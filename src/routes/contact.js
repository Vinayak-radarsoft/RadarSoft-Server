const express = require("express");
const { ContactPost } = require("../controller/contact");
const router = express.Router();

router.post("/contact", ContactPost);

module.exports = router;