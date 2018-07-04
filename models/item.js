'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    itemName: DataTypes.STRING,
    preorderAvailablility: DataTypes.INTEGER,
    itemCategory: DataTypes.STRING,
    downPayment: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    // associations can be defined here
    Items.belongsToMany(models.Client, { through: models.ClientItem })

  };
  return Item;
};