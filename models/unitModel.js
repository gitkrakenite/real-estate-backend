const mongoose = require("mongoose");

const unitSchema = mongoose.Schema(
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
    unitName: { type: String, required: true },
    assignedPropertyName: { type: String, required: true },
    unitRent: { type: Number, required: true },
    unitRentDeposit: { type: Number, required: true },
    unitWaterDeposit: { type: Number },
    unitInvestorName: { type: String, required: true },
    unitUnpaidDues: { type: Number },
    unitWaterReading: { type: Number, required: true },
    unitVacancy: { type: String, required: true },
    unitStatus: { type: String, default: "visible" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("unit", unitSchema);
