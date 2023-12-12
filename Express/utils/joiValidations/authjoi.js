const joi = require('joi');

module.exports = {
  login: (() => {
    return joi.object({
      email: joi.string().required().email().min(7).max(50),
      password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }).unknown(); // unknow allow to add
  })(),
  signup: (() => { 
    return joi.object({
      email: joi.string().required().email().min(7).max(50),
      userName: joi.string().required().min(3).max(50),
      password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      passwordConfirmation: joi.ref('password'),
    })
  })(),
  logout: (() => {
    return joi.object({
      userId: joi.string().required(),
    })
  })(),
}