'use strict'
module.exports = (sequelize, DataTypes) => {
	const findcats = sequelize.define('findcats', {
		latitude: DataTypes.DOUBLE,
		longitude: DataTypes.DOUBLE,
		address: DataTypes.STRING,
		contact: DataTypes.STRING,
		message: DataTypes.STRING,
		imagepath: DataTypes.STRING
	}, {})
  findcats.associate = function(models) {
		// associations can be defined here
	}
  return findcats
};