'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stat extends Model {
    static associate(models) {
    }
  }
  Stat.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    count_sells: DataTypes.INTEGER,
    count_price: DataTypes.INTEGER,
    count_posts: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Stat',
  });
  return Stat;
};