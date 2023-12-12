const authModel = require("../models/authModel");
const sessionModel = require("../models/sessionModel");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../../config/config.json")
const {v4: uuidV4} = require("uuid");


module.exports = {
  signup: async (body) => {
    try{
      const signupResponse = authModel.signup();
      delete body.passwordConfirmation;
      const { email, password } = body;
      const hashedPassword = await bcrypt.hash(password, 10);

      if(signupResponse.error){
        return { error: signupResponse.error }
      }
      return {response: signupResponse.response }

    }catch(error){
      return({ error: error })
    }
  },

  login: async (body) => {
    try{
      const { email, password } = body;
      const user = await authModel.login(email);
      const db_save_password = user.response.dataValues.password;
      const passwordMatch = await bcrypt.compare(password, db_save_password);
      if(!passwordMatch){
        return { error: 'Invalid credentials' }
      }

      const token = jwt.sign(user.response.dataValues, config.jwt.secret,{
        expiresIn: config.jwt.timeLimit.oneMinute,
        // expiresIn: "24h" //expiration time of the token is set to be 24 hours
      })
      const userId = user.response.dataValues.userId
      
      delete user.response.dataValues.password;

      const sessionId = uuidV4();
      const decoded = jwt.decode(token);
      const expireAt = decoded.exp * 1000

      await sessionModel.deleteSession(userId)
    
      const createSession = await sessionModel.createSession(
        userId,
        token,
        expireAt,
      )

      if(createSession.error || !createSession.response){
        return { error: 'could not create session invalid user 234'}
      }

      if(user.error){
        return { error: user.error }
      }
      return {response: token }

    }catch(error){
      return({ error: error })
    }
  },

  logout: async (body) => {
    try{
      const logoutResponse = authModel.logout(body.userId);
      
      if(logoutResponse.error){
        return { error: logoutResponse.error }
      }

      const deleteSession = await sessionModel.deleteSession(body.userId)
      if(!deleteSession.response){
        console.log("Session not found to delete.") 
        return {error: 'User is already Logged out.' }
      }else{ console.log("Session deleted.")}

      return {response: 'Logout Successfully' }

    }catch(error){
      return({ error: error })
    }
  }
}