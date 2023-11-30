const Sequelize = require('sequelize');

module.exports = {
  signup : () => {
    try{
      return { response: 'You are signup.'}
    }catch(error){
      return { error: error }
    };
  },

  login : () => {
    try{
      return { response: 'You are logged in.'}
    }catch(error){
      return { error: error }
    };
  },
  logout : () => {
    try{
      return { response: 'You are logged out.'}
    }catch(error){
      return { error: error }
    };
  },
}