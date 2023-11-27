const authModel = require("../models/authModel");
var bcrypt = require('bcryptjs');

module.exports = {
  login: (body) => {
    try{
      const loginResponse = authModel.login();
      console.log('myNum ==> ',body.password)
      // delete body.confirmPassword;
      // body.password = bcrypt.hash(body.password)
      if(!!!(parseInt(body.password))){
        return { error: "pass is Not an good" }
      }

      if(loginResponse.error){
        return { error: loginResponse.error }
      }
      return {response: loginResponse.response }

    }catch(error){
      return({ error: error })
    }
  },

  logout: () => {
    try{
      const loginResponse = authModel.logout();
      if(loginResponse.error){
        return { error: loginResponse.error }
      }
      return {response: loginResponse.response }

    }catch(error){
      return({ error: error })
    }
  }
}