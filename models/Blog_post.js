const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog_post extends Model{
}

Blog_post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Blog_post',
  }
);

module.exports = Blog_post;