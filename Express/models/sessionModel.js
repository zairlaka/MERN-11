const { models } = require("./index");
const { Op } = require('sequelize')


module.exports = {
  createSession: async (userId, refreshToken, expireAt) => {
    try {
      const session = await models.sessions.create({
        userId,
        refreshToken,
        expireAt,
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
  getSession: async (userId, token) => {
    try {
      const session = await models.sessions.findOne({
        where: {
          userId: userId,
          token: token
        },
      })
      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  getSessionByUserId: async (userId) => {
    try {
      const session = await models.sessions.findOne({
        where: {
          userId: userId,
        },
      })
      return {
        response: session,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  validSession: async (userId) => {
    try {
      const session = await models.sessions.findOne({
        where: {
          userId: userId,
          expireAt: { [Op.gt]: new Date() },
        },
      })
      if(!session){return {error: "session is not valid"};}
      return {response: session,};
    }catch(error){
      return {
        error: error,
      };
    }
  },
  deleteSession: async (userId) => {
    try {
      const session = await models.sessions.destroy({
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
  
};
