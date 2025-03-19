const express = require("express");
const route = express.Router();
const FlightController = require("../controller/FlightController");
route.get("/", FlightController.searchFlight);
module.exports = route;
