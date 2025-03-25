const express = require("express");
const route = express.Router();
const FlightController = require("../controller/FlightController");
route.get("/", FlightController.searchFlight);
route.post('/book-flight', FlightController.bookFlight);
route.get('/book-flight-byUser/:user_id', FlightController.getBookingsByUser);
module.exports = route;
