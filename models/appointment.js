'use strict';
module.exports = (sequelize, DataTypes) => {
  const appointment = sequelize.define('appointment', {
    userid: DataTypes.INTEGER,
    date: DataTypes.DATE,
    hospital: DataTypes.STRING,
    detail: DataTypes.STRING
  }, {});
  appointment.associate = function (models) {
    // associations can be defined here
  };
  return appointment;
};