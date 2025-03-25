const express = require("express");
const route = express.Router();
const FlightController = require("../controller/FlightController");
route.get("/", FlightController.searchFlight);
route.post('/book-flight', FlightController.bookFlight);
module.exports = route;
