const express = require("express");
const { getUserById } = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middleware/auth")

// single user by id
router.get('/:userId', authMiddleware, getUserById);



module.exports = router