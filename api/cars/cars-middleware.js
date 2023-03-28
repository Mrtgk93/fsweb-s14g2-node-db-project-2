const carsModel = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    let existCar = await carsModel.getById(req.params.id);
    if (!existCar) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      req.currentCar = existCar;
    }
    next();
  } catch (error) {
    next(error);
  }
  // HOKUS POKUS
};

const checkCarPayload = async (req, res, next) => {
  try {
    let requiredFields = ["vin", "make", "model", "mileage"];
    const missedFields = [];
    requiredFields.forEach((field) => {
      if (!req.body[field]) {
        missedFields.push(field);
      }
    });
    if (missedFields.length > 0) {
      let missedFieldsStr = missedFields.join();
      res.status(400).json({ message: `${missedFieldsStr} is missing` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
  // HOKUS POKUS
};

const checkVinNumberValid = (req, res, next) => {
  try {
    let isValidVin = vinValidator.validate(req.body.vin);
    if (!isValidVin) {
      res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }

  // HOKUS POKUS
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    let isExist = await carsModel.getByVin(req.body.vin);
    if (isExist) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
  // HOKUS POKUS
};
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
