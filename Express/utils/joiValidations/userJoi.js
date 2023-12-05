const joi = require('joi');

module.exports = {
  createUser: (() => {
    return joi.object().keys({
      firstName: joi.string().required().min(3).max(40),
      lastName: joi.string().required().min(3).max(40),
      email: joi.string().required().email(),
      password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      confirmPassword: joi.ref("password"),
      role: joi.string().valid("instructor", "trainee"),
    })//.unknown(); // unknow allow to add
  })(),
  
  getByUserId: (() => { 
    return joi.object().keys({
      userId: joi.string().required(),
    })
  })(),
  // getUser: (() => { 
  //   return joi.object({
  //     userId: joi.string().required(),
  //   })
  // })(),
  getUser: (() => { 
    return joi.object({
      email: joi.string(),
    })
  })(),
  // getUser: (() => {
  //   return joi.object().keys({
  //     email: joi.string().email(),
  //     userId: joi.string(),
  //   })
  // })(),

  pagination: (() => {
    return joi.object().keys({
      pageNo: joi.number().required().greater(0),
      limit: joi.number().valid(5, 10, 15, 20, 30, 40, 50, 100),
    })
  })(),
  
}

//.nand('email', 'userId')