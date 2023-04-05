const mongoose = require("mongoose");

const tenantSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tenantName: { type: String, required: true },
    tenantemailAddress: { type: String, required: true },
    tenantIdNumber: { type: String, required: true },
    tenantkraPin: { type: String, required: true },
    tenantMobile: { type: String, required: true },
    tenantMaritalStatus: { type: String, required: true },
    propertyToOccupy: { type: String, required: true },
    unitAssigned: { type: String, required: true },
    depositStatus: { type: String, required: true },
    tenantUnPaidDues: { type: Number, required: true },
    tenantStatus: { type: String, default: "visible" },
    tenantPhoto: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", tenantSchema);
