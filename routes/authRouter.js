const express = require("express");
const { loginValidation, signupValidation } = require("../middlewares/authValidation.js");
const { login,signup} = require("../controllers/authController.js");

const router = express.Router();

// Define login route with validation
router.post('/login', loginValidation, login)

// Define signup route with validation
router.post('/signup', signupValidation, signup)

module.exports = router;