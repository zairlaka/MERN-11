const joi = require('joi');

module.exports = {
  login: (() => {
    return joi.object({
      email: joi.string().required().email().min(7).max(50),
      password: joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }).unknown(); // unknow allow to add
  })(),
  signup: (() => { 
    return joi.object({
      email: joi.string().required().email().min(7).max(50),
      firstName: joi.string().required().min(3).max(50),
      lastName: joi.string().required().min(3).max(50),
      password: joi.string().required().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      confirmPassword: joi.ref('password'),
    })
  })(),
  logout: (() => {
    return joi.object({
      refreshToken: joi.string(),
    })
  })(),
}