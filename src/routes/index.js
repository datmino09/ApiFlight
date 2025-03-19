const UserController = require("../controller/UserController.js");
const FlightRoute = require("./FlightRoute");
const KhuVucRoute = require("./KhuVucRoute.js");
const SanBayRoute = require("./SanBayRoute.js");
const UserRoute = require("./UserRoute.js");
function routes(app) {
    app.use("/flights", FlightRoute);
    app.use("/khuvuc", KhuVucRoute);
    app.use("/sanbay", SanBayRoute);
    app.use("/user",UserRoute);
  }
module.exports = routes;
