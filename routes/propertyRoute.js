const express = require("express");
const router = express.Router();

// base_url => /api/v1/property
router.post("/"); //create property;
router.get("/"); // fetch my properties;
router.put("/:id"); // update my property;
router.delete("/:id"); // delete my property

module.exports = router;
