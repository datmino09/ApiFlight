const express = require("express");
const route = express.Router();
const KhuVucController = require("../controller/KhuVucController");
route.get("/", KhuVucController.getAll);
module.exports = route;
