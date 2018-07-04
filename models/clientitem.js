'use strict';
module.exports = (sequelize, DataTypes) => {
  var ClientItem = sequelize.define('ClientItem', {
    ClientId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    purchasePrice: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    maxRepaymentDate: DataTypes.DATE,
    paymentStatus: DataTypes.BOOLEAN,
    itemArrivalDate: DataTypes.DATE
  }, {});
  ClientItem.associate = function (models) {
    // associations can be defined here

    ClientItem.belongsTo(models.Client)
    ClientItem.belongsTo(models.Item)

  };
  return ClientItem;
};