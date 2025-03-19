const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sanbay', {
    MaSanBay: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    TenSanBay: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    MaKhuVuc: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    QuocGia: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    TrangThai: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'sanbay',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaSanBay" },
        ]
      },
      {
        name: "MaKhuVuc",
        using: "BTREE",
        fields: [
          { name: "MaKhuVuc" },
        ]
      },
    ]
  });
};
