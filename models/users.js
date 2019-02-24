'use strict';
import bcrypt from "bcrypt-nodejs";

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  users.beforeCreate((user, options) => {
    user.password = bcrypt.hashSync(user.password);
  });
  users.prototype.toJSON = function() {
    var values = Object.assign({}, this.get());

    delete values.password;
    return values;
  };
  users.comparePassword = async (email, candidatePassword, callback) => {
    const user = await users.findOne({ where: { email: email } });
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  };
  return users;
};