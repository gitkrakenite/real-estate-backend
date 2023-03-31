const express = require("express");
const {
  createUnit,
  getMyUnits,
  updateUnit,
} = require("../controllers/unitController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createUnit); //create a unit
router.get("/", protect, getMyUnits); // fetch unit based on property name
router.put("/:id", updateUnit); // update unit and status

module.exports = router;
