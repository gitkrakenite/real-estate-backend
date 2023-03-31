const Unit = require("../models/unitModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:5000/api/v1/unit
// private
const createUnit = async (req, res, next) => {
  const {
    unitName,
    assignedPropertyName,
    unitRent,
    unitRentDeposit,
    unitWaterDeposit,
    unitInvestorName,
    unitUnpaidDues,
    unitWaterReading,
    unitVacancy,
    unitStatus,
  } = req.body;

  if (
    !unitName ||
    !assignedPropertyName ||
    !unitWaterDeposit ||
    !unitRent ||
    !unitVacancy
  ) {
    res.status(404).json({ message: "fields missing" });
    return;
  }
  try {
    const unit = await Unit.create({
      unitName,
      assignedPropertyName,
      unitRent,
      unitRentDeposit,
      unitWaterDeposit,
      unitInvestorName,
      unitUnpaidDues,
      unitWaterReading,
      unitVacancy,
      unitStatus,
      user: req.user.name,
      userId: req.user.id,
    });

    res.status(201).send(unit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @fetch  GET
// http://localhost:5000/api/v1/unit
// private
const getMyUnits = async (req, res) => {
  const { assignedPropertyName } = req.body;

  if (!assignedPropertyName) {
    res.send("No property name");
    return;
  }

  try {
    const unit = await Unit.find({
      userId: req.user.id,
      unitStatus: "visible",
      assignedPropertyName: assignedPropertyName,
    }).sort({
      $natural: -1,
    });
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @Update  PUT
// http://localhost:5000/api/v1/unit:id
// private
const updateUnit = async (req, res, next) => {
  // check if unit exist
  const unit = await Unit.findById(req.params.id);

  if (!unit) {
    res.status(400).json({ message: "Unit not found" });
    return;
  }

  try {
    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUnit);
  } catch (error) {
    res.status(400).json({ message: "Could not update unit" });
  }
};

module.exports = {
  createUnit,
  updateUnit,
  getMyUnits,
};
