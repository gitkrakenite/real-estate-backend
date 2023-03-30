const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// base_url => /api/v1/user

router.post("/register", registerUser); // create Account
router.post("/login", loginUser); // login
router.get("/", protect, getUser); //fetch my details

module.exports = router;
