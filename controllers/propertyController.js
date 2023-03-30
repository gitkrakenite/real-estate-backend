const Property = require("../models/propertyModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:5000/api/v1/property
// private
const createProperty = async (req, res, next) => {
  const {
    propertyName,
    propertyImg,
    unitsNo,
    propertyLocation,
    gpsCoordinates,
    landlordName,
    landLordProfile,
    landlordEmailAddress,
    landlordPhoneNumber,
    landlordKraPin,
    propertyStatus,
  } = req.body;

  if (
    !propertyName ||
    !propertyImg ||
    !unitsNo ||
    !propertyLocation ||
    !landlordName ||
    !landlordEmailAddress ||
    !landlordPhoneNumber ||
    !landlordKraPin
  ) {
    res.status(404).json({ message: "fields missing" });
    return;
  }
  try {
    const property = await Property.create({
      propertyName,
      propertyImg,
      unitsNo,
      propertyLocation,
      gpsCoordinates,
      landlordName,
      landLordProfile,
      landlordEmailAddress,
      landlordPhoneNumber,
      landlordKraPin,
      propertyStatus,
      user: req.user.name,
      userId: req.user.id,
    });

    res.status(201).send(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @fetch  GET
// http://localhost:5000/api/v1/property
// private
const getMyProperties = async (req, res) => {
  try {
    const property = await Property.find({
      userId: req.user.id,
      propertyStatus: "visible",
    }).sort({
      $natural: -1,
    });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).send(error);
  }
};

// @delete  DELETE
// http://localhost:5000/api/v1/property:id
// private
const deleteProperty = async (req, res, next) => {
  // check if property exist
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(400).json({ message: "Property not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (property.user.toString() !== user.name) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete property" });
  }
};

// @delete  PUT
// http://localhost:5000/api/v1/property:id
// private
const updateProperty = async (req, res, next) => {
  // check if property exist
  const property = await Property.findById(req.params.id);

  if (!property) {
    res.status(400).json({ message: "Property not found" });
    return;
  }

  // const user = await User.findById(req.user.id); //find the logged in user from db

  // // check for user
  // if (!user) {
  //   res.status(401).send("user not found");
  //   return;
  // }

  // // compare the user who created the goal with the logged in user
  // if (property.user.toString() !== user.name) {
  //   res.status(401).send("Not Authorized");
  //   return;
  // }

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(400).json({ message: "Could not update property" });
  }
};

module.exports = {
  createProperty,
  deleteProperty,
  getMyProperties,
  updateProperty,
};
