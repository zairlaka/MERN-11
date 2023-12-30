const joi = require('joi');

module.exports = {
  createUser: (() => {
    return joi.object().keys({
      firstName: joi.string().required().min(3).max(40),
      lastName: joi.string().required().min(3).max(40),
      email: joi.string().required().email(),
      password: joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      confirmPassword: joi.ref("password"),
      role: joi.string().valid("instructor", "trainee", "admin"),
    })//.unknown(); // unknow allow to add
  })(),

  updateUser: (() => {
    return joi.object().keys({
      userId: joi.string().required(),
      firstName: joi.string().required().min(3).max(40),
      lastName: joi.string().required().min(3).max(40),
      email: joi.string().required().email(),
      role: joi.string().valid("instructor", "trainee", "admin"),
    })//.unknown(); // unknow allow to add
  })(),
  
  getByUserId: (() => { 
    return joi.object().keys({
      userId: joi.string().required(),
    })
  })(),
  getUser: (() => {
    return joi.object().keys({
      email: joi.string().email(),
      userId: joi.string()
    }).unknown();
  })(),

  pagination: (() => {
    return joi.object().keys({
      pageNo: joi.number().default(1).greater(0),
      limit: joi.number().default(10).valid('all',5, 10, 15, 20, 30, 40, 50, 100),
      sortValue: joi.string().valid("userId", "email", "role", "firstName", "lastName", "createdAt").default('userId'),
      sortOrder: joi.valid("ASC", "DESC").default("DESC"),
      search: joi.object(),
    })
  })(),
  
}

//.nand('email', 'userId')