const authModel = require("../models/authModel");
const sessionModel = require("../models/sessionModel");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const config = require("../config.json")
const {v4: uuidV4} = require("uuid");


module.exports = {
  signup: async (body) => {
    try{
      const loginResponse = authModel.signup();
      delete body.passwordConfirmation;
      const { email, password } = body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const sessionId = uuidV4();
      const createSession = await sessionModel.createSession(
        user,
        token,
        expireAt,
      )

      if(createSession.error || !createSession.response){
        return { error: createSession.session, message: 'could not create a session'}
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
      const { email, password } = body;
      const user = await authModel.login(email);
      // console.log('myNum ==> ',user)
      const db_save_password = user.response.dataValues.password;
      const passwordMatch = await bcrypt.compare(password, db_save_password);
      if(!passwordMatch){
        return { error: 'Invalid credentials' }
      }

      const token = jwt.sign(user.response.dataValues, config.jwt.secret,{
        expiresIn: "5m",
        // expiresIn: "24h" //expiration time of the token is set to be 24 hours
      })
      const userId = user.response.dataValues.userId
      const session = await sessionModel.getSessionByUserId(userId)
      
      delete user.response.dataValues.password;

      const sessionId = uuidV4();
      const decoded = jwt.decode(token);
      const expireAt = decoded.exp * 1000
      
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