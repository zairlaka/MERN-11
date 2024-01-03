const authModel = require("../models/authModel");
const sessionModel = require("../models/sessionModel");
const userModel = require("../models/userModel");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config/config.json")
const {v4: uuidV4} = require("uuid");


module.exports = {
  signup: async (body) => {
    try{
      const userId = uuidV4();
      const isUser = await userModel.getUserByEmail(body.email);
      if (isUser.response) {
        return {
          error: "User with this email is already exists",
        };
      }

      delete body.confirmPassword;
      body.password = await bcrypt.hash(body.password, 10);
      const signupResponse = await authModel.signup(body, userId);

      if(signupResponse.error){
        return { error: signupResponse.error }
      }
      return {response: signupResponse.response }

    }catch(error){
      console.log("🚀 ~ file: authService.js:30 ~ signup: ~ error🔻:", error)
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
        expiresIn: config.jwt.timeLimit.oneHour,
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
      return {response: {token: token, userId: userId} }

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
  },

  getSession: async (userId) => {
    try {
      const session = await authModel.getSession(userId);
      if (session.error || !session.response) {
        return {
          error: session.error,
        };
      }
      return {
        response: true,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
}