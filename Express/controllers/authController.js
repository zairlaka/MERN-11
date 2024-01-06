const config = require("../config/config.json");
const authService = require("../services/authService");
const authSchema = require("../utils/joiValidations/authJoi");

module.exports = {
  signup: async (req, res) => {
    try{
      const validate = await authSchema.signup.validateAsync(req.body)
      const signupResponse = await authService.signup(validate);
      if(signupResponse.error){
         return res.send({ error: signupResponse.error })
      }
       return res.send({ response: signupResponse.response })
    }catch(error){
       return res.send({ error: error})
    }
  },

  login: async (req, res) => {
    try{
      const validate = await authSchema.login.validateAsync(req.body)
      const loginResponse = await authService.login(validate);
      
      console.log("🚀 ~ file: authController.js:25 ~ login: ~ loginResponse🔻:", loginResponse)
      if(loginResponse.error){
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      let options = {
        maxAge: 1000 * 60 * parseInt(config.jwt.timeLimit.oneHour), // would expire after 5 minutes
        httpOnly: true, // The cookie only accessible by the web server
      }
      // res.cookie("accessToken", loginResponse.response.token, options)
      res.cookie("refreshToken", loginResponse.response.refreshToken, options)
      delete loginResponse.response.refreshToken;
      return res.send({ response: loginResponse.response })
    }catch(error){
       console.log("🚀 ~ file: authController.js:36 ~ login: ~ error🔻:", error)
       return res.send({ error: error})
    }
  },

  logout: async (req, res) => {
    try{ 
      const cookies = req.cookies;
      if(!cookies?.refreshToken) return sendStatus(204);// no content
      const refreshToken = cookies.refreshToken
      const logoutResponse = await authService.logout(refreshToken)




      // const validate = await authSchema.logout.validateAsync(req.query)
      // const logoutResponse = await authService.logout(validate)
      if(logoutResponse.error){
        return res.send({ error: logoutResponse.error })
      }
      return res.send({ response: logoutResponse.response })
    }
    catch(error){
      return res.send({ error: error})
    }
  },
  getSession: async (req, res) => {
    try {
      const userId = req.cookies.auth.userId;
      const session = await authService.getSession(userId);
      if (session.error) {
        return res.send({
          error: session.error,
        });
      }
      return res.send({
        response: session.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  getRefreshToken: async (req, res) => {
    try {
      const cookies = req.cookies
      if(!cookies?.refreshToken) return res.sendStatus(401)
      const refreshToken = cookies.refreshToken
      console.log("🚀 ~ file: authController.js:86 ~ getRefreshToken: ~ refreshToken🔻:", refreshToken)

      const session = await authService.getSessionByRefreshToken(refreshToken);
      console.log("🚀 ~ file: authController.js:89 ~ getRefreshToken: ~ session🔻:", session)
      
      if (session?.error) {
        return res.send({
          error: session.error,
        });
      }
      return res.send({
        response: session.response,
      });
    } catch (error) {
      console.log("🚀 ~ file: authController.js:99 ~ getRefreshToken: ~ error🔻:", error)
      return res.send({
        error: error,
      });
    }
  },
}
