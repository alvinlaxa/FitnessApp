const express = require("express");
const userController = require("../controllers/user");
const { verify } = require("../auth"); // Make sure verify is correctly imported

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/details", verify, userController.getProfile); // Secure route

module.exports = router;
