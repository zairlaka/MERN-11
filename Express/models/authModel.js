const Sequelize = require('sequelize');
const { models } = require('./index')

module.exports = {
  signup: async (body, userId) => {
    try {
      const user = await models.users.create({
        userId,
        ...body,
      });
      return {
        response: user,
      };
    }catch(error){
      console.log("🚀 ~ file: authModel.js:15 ~ signup: ~ error🔻:", error)
      return { error: error }
    };
  },

  login: async (email) => {
    try{
      const user = await models.users.findOne({
        where: {
          email: email,
        },
        attributes: { exclude: ["createdAt", "updatedAt", "detetedAt"]},
      })
      return { response: user }
    }catch(error){
      return { error: error }
    };
  },
  logout: async (userId) => {
    try{
      const user = await models.users.findOne({
        where: {
          userId: userId,
        },
        attributes: { exclude: ["createdAt", "updatedAt", "detetedAt"]},
      })
      return { response: user }
    }catch(error){
      return { error: error }
    };
  },
  getSession: async (userId) => {
    try {
      const session = await models.sessions.findOne({
        where: {
          userId: userId,
        },
      });

      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
}