'use strict';
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
const plainText = 'not_bacon';

module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: {type : DataTypes.STRING,
                validate : {len : {args : [8,13],
                                        msg : 'panjang 8-13'}
                                      }
                                    },
    saldo: DataTypes.INTEGER,
    username : {type:DataTypes.STRING,
              validate : { isUnique : function(username, next) {
                Client.find({
                    where: {
                      name:username,
                    }
                  })
                  .then(function(usrnameValidation){
                    if(usrnameValidation !== null) {
                      next("this username was exist !")
                    } else {
                      next()
                    }
                  })
                }
              }},
    password : DataTypes.STRING
  }, { 
    hooks : { beforeCreate : function(Client){
      var salt = bcrypt.genSaltSync(saltRounds);
      var hash = bcrypt.hashSync(Client.password, salt);
      Client.password = hash

    }}
  });
  Client.associate = function (models) {
    // associations can be defined here
    Client.belongsToMany(models.Item, { through: models.ClientItem })
  };
  return Client;
};