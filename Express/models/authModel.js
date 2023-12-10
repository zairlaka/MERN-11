const Sequelize = require('sequelize');
const { models } = require('./index')

module.exports = {
  signup: async (body) => {
    try{
      const user = await models.users.create({
        where: {
          email: email,
        },
      })
      return { response: user }
    }catch(error){
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
  logout: () => {
    try{
      return { response: 'You are logged out.'}
    }catch(error){
      return { error: error }
    };
  },
}