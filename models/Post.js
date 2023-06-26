const { Model, DataTypes } = require("sequelize");

class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contents: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_created: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sequelize,
  createdAt: true,
  timestamps: true,
  tableName: "Post",
});

module.exports = Post;
