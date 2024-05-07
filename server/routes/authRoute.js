const express = require("express");
const { registration } = require("../controllers/authController");
const router = express.Router();


// registration route

router.post('/register',registration);


module.exports = router;