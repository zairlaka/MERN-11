const authService = require("../services/authService");
const schema = require("../utils/joiValidations/authjoi");

module.exports = {
  signup: async (req, res) => {
    try{
      const validate = await schema.signup.validateAsync(req.body)
      const signupResponse = await authService.signup(req.body);
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
      const validate = await schema.login.validateAsync(req.body)
      const loginResponse = await authService.login(validate);
      
      if(loginResponse.error){
        return res.status(401).json({ error: 'Invalid credentials' });
        //  return res.send({ error: loginResponse.error })
      }
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
