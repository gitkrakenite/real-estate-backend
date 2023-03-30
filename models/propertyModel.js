const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
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
    propertyName: { type: String, required: true },
    propertyImg: { type: String, required: true },
    unitsNo: { type: Number, required: true },
    propertyLocation: { type: String, required: true },
    gpsCoordinates: { type: String },
    landlordName: { type: String, required: true },
    landLordProfile: { type: String },
    landlordEmailAddress: { type: String, required: true },
    landlordPhoneNumber: { type: String, required: true },
    landlordKraPin: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("property", propertySchema);
