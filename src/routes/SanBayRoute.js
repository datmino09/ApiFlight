const express = require("express");
const route = express.Router();
const SanBayController = require("../controller/SanBayController");
route.get("/:MaKhuVuc", SanBayController.getByKhuVuc);
module.exports = route;