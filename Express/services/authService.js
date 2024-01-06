require('dotenv').config()

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
      const user = await authModel.login(email); // we can get from const user = res.locals.user 
      const db_save_password = user.response.dataValues.password;
      const passwordMatch = await bcrypt.compare(password, db_save_password);
      if(!passwordMatch){
        return { error: 'Invalid credentials' }
      }
      delete user.response.dataValues.password; // we don't want to include password else is fine for now

      // or use process.env.ACCESS_TOKEN_SECRET instead of config.jwt.access_token_secret,
      console.log("🚀 ~ file: authService.js:51 ~ login: ~ process.env.ACCESS_TOKEN_SECRET🔻:", process.env.ACCESS_TOKEN_SECRET)
      const accessToken = jwt.sign(
        user.response.dataValues, 
        config.jwt.access_token_secret,
        {
          expiresIn: config.jwt.timeLimit.test30Seconds,
          // expiresIn: "24h" //expiration time of the token is set to be 24 hours
      })
      const refreshToken = jwt.sign(
        user.response.dataValues, 
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: config.jwt.timeLimit.oneMinute,
      })
      const userId = user.response.dataValues.userId
      
      // const sessionId = uuidV4();
      const decoded = jwt.decode(refreshToken);
      const expireAt = decoded.exp * 1000
      
      await sessionModel.deleteSession(userId)
      
      const createSession = await sessionModel.createSession(
        userId,
        refreshToken,
        expireAt,
      )

      if(createSession.error || !createSession.response){
        return { error: 'could not create session invalid user 234'}
      }

      if(user.error){
        console.log("🚀 ~ file: authService.js:86 ~ login: ~ user.error🔻:", user.error)
        return { error: user.error }
      }
      return {response: {accessToken: accessToken, refreshToken: refreshToken, userId: userId} }

    }catch(error){
      console.log("🚀 ~ file: authService.js:92 ~ login: ~ error🔻:", error)
      return({ error: error })
    }
  },

  logout: async (refreshToken) => {
    try{
      const logoutResponse = authModel.logout(body.userId);
      
      if(logoutResponse.error){
        return { error: logoutResponse.error }
      }

      const deleteSession = await sessionModel.deleteSession(refreshToken)
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
  getSessionByRefreshToken: async (refreshToken) => {
    try {
      const session = await authModel.getSessionByRefreshToken(refreshToken);
      if (session.error || !session.response) {
        console.log("🚀 ~ file: authService.js:136 ~ getSessionByRefreshToken: ~ session🔻:", session)
        return {
          error: session.error,
        };
      }
      console.log("🚀 ~ file: authService.js:147 ~ getSessionByRefreshToken: ~ session.response.dataValues.userId🔻:", session.response.dataValues.userId)
      return jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          console.log("🚀 ~ file: authService.js:147 ~ getSessionByRefreshToken: ~ decoded:", decoded)
          if(!!err || session.response.dataValues.userId !== decoded.userId) {
            return {
              error: 'Not valid or Expired.',
            };
          }

          const accessToken = jwt.sign(
            decoded, 
            config.jwt.access_token_secret,
            )
          const ver = jwt.verify(
            accessToken,
            config.jwt.access_token_secret)
          console.log("🚀 ~ file: authService.js:163 ~ getSessionByRefreshToken: ~ ver🔻:", ver)
          console.log("🚀 ~ file: authService.js:159 ~ getSessionByRefreshToken: ~ accessToken🔻:", accessToken)
          return {
            response: {accessToken: accessToken, userId: decoded.userId},
          };
        }
      )
    } catch (error) {
      return {
        error: error,
      };
    }
  },
}