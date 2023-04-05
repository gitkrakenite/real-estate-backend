const express = require("express");
const {
  createTenant,
  getMyTenants,
  updateTenant,
} = require("../controllers/tenantController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createTenant); //create a tenant, Private to the owner
router.get("/", protect, getMyTenants); //fetch my tenants, Private
router.put("/:id", updateTenant); //update tenant
router.put("del/:id", updateTenant); //update tenant from visible and hide

module.exports = router;
