const express = require("express");
const {
  registerUser,
  loginUser,
  //   getUser,
} = require("../controllers/userController");
const router = express.Router();

// base_url => /api/v1/user

router.post("/register", registerUser); // create Account
router.post("/login", loginUser); // login
// router.get("/", getUser); //fetch my details

module.exports = router;
