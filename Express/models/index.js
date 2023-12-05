const sequelize = require("../bin/dbConnection");
const users = require("./definations/users");
const teams = require("./definations/teams");
// const teamMembers = require("./definations/teamMembers");
const projects = require("./definations/projects");
const tasks = require("./definations/tasks");

const models = {
  users,
  teams,
  // teamMembers,
  projects,
  tasks,
};

/// relations

//teams-projects one-to-one
teams.hasOne(projects, { foreignKey: "projectId" });
projects.belongsTo(teams, { foreignKey: "teamId" });

//projects-task one-to-many
projects.hasMany(tasks, { foreignKey: "projectId" });
tasks.belongsTo(projects, { foreignKey: "projectId" });

//teamMembers-task one-to-many
//teamMembers-Users one-to-many
//teamMembers-teams one-to-many
//users-teams one-to-many (user as a intructor)

const db = {};
db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models, sequelize };
