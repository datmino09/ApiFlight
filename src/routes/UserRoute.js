const express = require("express");
const route = express.Router();
const UserController = require("../controller/UserController");
route.post("/login", UserController.loginApp);
route.post("/register",UserController.registerApp);
module.exports = route;