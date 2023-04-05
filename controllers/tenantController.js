const Tenant = require("../models/tenantModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:5000/api/v1/tenant
// private
const createTenant = async (req, res, next) => {
  const {
    tenantName,
    tenantemailAddress,
    tenantIdNumber,
    tenantkraPin,
    tenantMobile,
    tenantMaritalStatus,
    propertyToOccupy,
    unitAssigned,
    depositStatus,
    tenantUnPaidDues,
    tenantPhoto,
    tenantStatus,
  } = req.body;

  if (
    !tenantName ||
    !tenantIdNumber ||
    !tenantMobile ||
    !depositStatus ||
    !propertyToOccupy
  ) {
    res.status(404).json({ message: "fields missing" });
    return;
  }
  try {
    const tenant = await Tenant.create({
      tenantName,
      tenantemailAddress,
      tenantIdNumber,
      tenantkraPin,
      tenantMobile,
      tenantMaritalStatus,
      propertyToOccupy,
      unitAssigned,
      depositStatus,
      tenantUnPaidDues,
      tenantPhoto,
      tenantStatus,
      user: req.user.name,
      userId: req.user.id,
    });

    res.status(201).send(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @GET  fetch my tenants
// http://localhost:5000/api/v1/tenant
// private
const getMyTenants = async (req, res) => {
  try {
    const tenant = await Tenant.find({
      userId: req.user.id,
      tenantStatus: "visible",
    }).sort({
      $natural: -1,
    });
    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @Update  PUT
// http://localhost:5000/api/v1/tenant:id
// private
const updateTenant = async (req, res, next) => {
  // check if unit exist
  const tenant = await Tenant.findById(req.params.id);

  if (!tenant) {
    res.status(400).json({ message: "tenant not found" });
    return;
  }

  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedTenant);
  } catch (error) {
    res.status(400).json({ message: "Could not update tenant" });
  }
};

module.exports = {
  createTenant,
  updateTenant,
  getMyTenants,
};
