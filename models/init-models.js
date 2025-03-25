var DataTypes = require("sequelize").DataTypes;
var _book = require("./book");
var _khuvuc = require("./khuvuc");
var _sanbay = require("./sanbay");
var _user = require("./user");

function initModels(sequelize) {
  var book = _book(sequelize, DataTypes);
  var khuvuc = _khuvuc(sequelize, DataTypes);
  var sanbay = _sanbay(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  sanbay.belongsTo(khuvuc, { as: "MaKhuVuc_khuvuc", foreignKey: "MaKhuVuc"});
  khuvuc.hasMany(sanbay, { as: "sanbays", foreignKey: "MaKhuVuc"});
  book.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(book, { as: "books", foreignKey: "user_id"});

  return {
    book,
    khuvuc,
    sanbay,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
