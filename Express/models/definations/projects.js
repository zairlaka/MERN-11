// const Sequelize = require('sequelize');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../bin/dbConnection');
class Project extends Model {}


Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User, // 'Actors' would also work
    //     key: 'id'
    //   }
    // }
  },
  { 
    sequelize,
    timestamps: true,
    paranoid: true,
    modelName: "projects"
  }
)

module.exports = Project;

// sequelize model:generate --name Company --attributes name:STRING
// sequelize model:generate --name User --attributes email:STRING,firstName:STRING,lastName:STRING,companyId:INTEGER

// companyId: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   references: {         // User belongsTo Company 1:1
//     model: 'Companies',
//     key: 'id'
//   }
// },