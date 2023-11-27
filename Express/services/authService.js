const authModel = require("../models/authModel");
var bcrypt = require('bcryptjs');

module.exports = {
  signup: async (body) => {
    try{
      const loginResponse = authModel.signup();
      delete body.confirmPassword;
      const { email, password } = body;
      const existingUser = false;
      const db_save_password = 'dsf'
      const hashedPassword = await bcrypt.hash(password, 10);
      if(!!!(parseInt(body.password))){
        return { error: 'Invalid credentials' }
      }

      if(loginResponse.error){
        return { error: loginResponse.error }
      }
      return {response: loginResponse.response }

    }catch(error){
      return({ error: error })
    }
  },

  login: async (body) => {
    try{
      const loginResponse = authModel.login();
      console.log('myNum ==> ',body.password)
      const { email, password } = body;
      const existingUser = false;
      const db_save_password = '$2a$10$zHsltUB1.3VWiinYkO8jBucrLvHmKPLHLY4LwWA905GzDQthZmMO.x';
      const passwordMatch = await bcrypt.compare(password, db_save_password);
      if(!passwordMatch){
        return { error: "password is incorrect!" }
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