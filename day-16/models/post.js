"use strict";
const { Model } = require("sequelize");
const student = require("./student");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Student }) {
      // define association here
      this.belongsTo(Student, { foreignKey: "studentId", as: "student" });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    },
  );
  return Post;
};
