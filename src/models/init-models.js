var DataTypes = require("sequelize").DataTypes;
var _khuvuc = require("./khuvuc");
var _sanbay = require("./sanbay");
var _user = require("./user");
var _book = require("./book");

function initModels(sequelize) {
  var khuvuc = _khuvuc(sequelize, DataTypes);
  var sanbay = _sanbay(sequelize, DataTypes);
  var user = _user(sequelize,DataTypes);
  var book = _book(sequelize,DataTypes);
  return {
    khuvuc,
    sanbay,
    user,
    book,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
