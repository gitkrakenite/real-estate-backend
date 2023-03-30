const express = require("express");
const {
  createProperty,
  getMyProperties,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// base_url => /api/v1/property
router.post("/", protect, createProperty); //create property;
router.get("/", protect, getMyProperties); // fetch my properties;
router.put("/:id", updateProperty); // update my property;
router.delete("/:id", protect, deleteProperty); // delete my property

module.exports = router;
