const authService = require("../services/authService");
const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().required().email().min(7).max(50),
  password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})
module.exports = {
  login: async (req, res) => {
    console.log('req.query ----> ', req.query)
    console.log('req.body ----> ', req.body)
    try{
      const validate = await loginSchema.validateAsync(req.body)
      console.log('validate --> ', validate);
      const loginResponse = authService.login(validate);
      if(loginResponse.error){
         return res.send({ error: loginResponse.error })
      }
       return res.send({ response: loginResponse.response })
    }catch(error){
       return res.send({ error: error})
    }
  },

  logout: (req, res) => {
    console.log('req.query ----> ', req.query)
    console.log('req.body ----> ', req.body)
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
