'use strict';
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const plainText = 'not_bacon';

module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    saldo: DataTypes.INTEGER,
    username : DataTypes.STRING,
    password : DataTypes.STRING
  }, 
  {});
  Client.associate = function (models) {
    // associations can be defined here
    Client.belongsToMany(models.Item, { through: models.ClientItem })
  };
  return Client;
};