'use strict';
module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define('news', {
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  news.associate = function(models) {
    // associations can be defined here
  };
  return news;
};