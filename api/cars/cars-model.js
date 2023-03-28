const db = require("../../data/db-config");

const getAll = () => {
  // HOKUS POKUS
  return db("cars");
};

const getById = (id) => {
  // HOKUS POKUS
  return db("cars").where({ id: id }).first();
};

const getByVin = (vin) => {
  return db("cars").where({ vin: vin }).first();
};

const create = async (car) => {
  // HOKUS POKUS
  const id = await db("cars").insert(car);
  return await getById(id);
};
module.exports = { getAll, getById, create, getByVin };
