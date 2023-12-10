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
       res.send({ error: error})
    }
  },

  login: async (req, res) => {
    try{
      const validate = await authSchema.login.validateAsync(req.body)
      const loginResponse = await authService.login(validate);
      
      if(loginResponse.error){
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.cookie("authToken", loginResponse.response)
      return res.send({ response: loginResponse.response })
    }catch(error){
       return res.send({ error: error})
    }
  },

  logout: (req, res) => {
    try{ 
      const logoutResponse  = authService.logout();
      if(logoutResponse.error){
        res.send({ error: logoutResponse.error })
      }
      res.send({ response: logoutResponse.response })
    }
    catch(error){
      res.send({ error: error})
    }
  }

}
