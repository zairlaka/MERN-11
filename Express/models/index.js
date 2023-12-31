const sequelize = require("../bin/dbConnection");
const users = require("./definations/users");
const teams = require("./definations/teams");
// const teamMembers = require("./definations/teamMembers");
const projects = require("./definations/projects");
const tasks = require("./definations/tasks");
const sessions = require("./definations/sessions");
const requests = require("./definations/requests");

const models = {
  users,
  teams,
  // teamMembers,
  projects,
  tasks,
  sessions,
  requests,
};

/// relations

//teams-projects one-to-one
teams.hasOne(projects, { foreignKey: "projectId" });
projects.belongsTo(teams, { foreignKey: "teamId" });

//teams-projects one-to-one
users.hasOne(sessions, { foreignKey: "userId" });
sessions.belongsTo(users, { foreignKey: "userId" });

//projects-task one-to-many
projects.hasMany(tasks, { foreignKey: "projectId" });
tasks.belongsTo(projects, { foreignKey: "projectId" });

users.hasMany(models.requests, { as: 'trainee', foreignKey: 'traineeId'});
users.hasMany(models.requests, { as: 'instructor', foreignKey: 'instructorId'});

// User.findByPk(id, {
//   include: {
//     model: User,
//     as: 'Followers'
//   }
// });
// User.findByPk(id, {
//   include: {
//     model: User,
//     as: 'Following'
//   }
// });

// User.hasMany(models.Follow, { as: 'FollowerLinks', foreignKey: 'follower'});
// User.hasMany(models.Follow, { as: 'FollowingLinks', foreignKey: 'following'});

//teamMembers-task one-to-many
//teamMembers-Users one-to-many
//teamMembers-teams one-to-many
//users-teams one-to-many (user as a intructor)

const db = {};
db.sequelize = sequelize;
sequelize.models = models;

module.exports = { db, models, sequelize };
