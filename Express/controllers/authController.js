const authService = require("../services/authService");
const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().required().email().min(7).max(50),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).unknown(); // unknow allow to add
const signupSchema = joi.object({
  email: joi.string().required().email().min(7).max(50),
  userName: joi.string().required().min(3).max(50),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  passwordConfirmation: joi.ref('password')
})
module.exports = {
  signup: async (req, res) => {
    try{
      const validate = await loginSchema.validateAsync(req.body)
      console.log('validate --> ', validate);
      const signupResponse = await authService.signup(validate);
      if(signupResponse.error){
         return res.send({ error: signupResponse.error })
      }
       return res.send({ response: req })
    }catch(error){
       return res.send({ error: error})
    }
  },

  login: async (req, res) => {
    try{
      const validate = await loginSchema.validateAsync(req.body)
      console.log('validate --> ', validate);
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
