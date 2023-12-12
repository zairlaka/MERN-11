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
      
      if(loginResponse.error){
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      let options = {
        maxAge: 1000 * 60 * 5, // would expire after 5 minutes
        // httpOnly: true, // The cookie only accessible by the web server
      }
      res.cookie("authToken", loginResponse.response, options)
      return res.send({ response: loginResponse.response })
    }catch(error){
       return res.send({ error: error})
    }
  },

  logout: async (req, res) => {
    try{ 
      const validate = await authSchema.logout.validateAsync(req.query)
      const logoutResponse = await authService.logout(validate)
      if(logoutResponse.error){
        return res.send({ error: logoutResponse.error })
      }
      return res.send({ response: logoutResponse.response })
    }
    catch(error){
      return res.send({ error: error})
    }
  }
}
