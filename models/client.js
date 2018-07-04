'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    saldo: DataTypes.INTEGER
  }, {});
  Client.associate = function (models) {
    // associations can be defined here
    Client.belongsToMany(models.Item, { through: models.ClientItem })
  };
  return Client;
};