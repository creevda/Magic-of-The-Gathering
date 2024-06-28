/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable import/newline-after-import */
/* eslint-disable strict */
/* eslint-disable lines-around-directive */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Stat }) {
	this.belongsToMany(User, {
	  through: Stat,
	  foreignKey: 'post_id',
	});
 }
  }
  Post.init({
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    city_owner: DataTypes.STRING,
    description: DataTypes.STRING,
    img: DataTypes.STRING,
    frazzle: DataTypes.STRING,
    sold: DataTypes.BOOLEAN,
    serialId: DataTypes.STRING,
    rarity: DataTypes.STRING,
    artist: DataTypes.STRING,
    type: DataTypes.STRING,
    setName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};