// HOKUS POKUS
const router = require("express").Router();
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");
const carsModel = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    let cars = await carsModel.getAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", checkCarId, async (req, res, next) => {
  try {
    res.json(req.currentCar);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      let { vin, make, model, mileage } = req.body;
      let created = await carsModel.create(req.body);
      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
