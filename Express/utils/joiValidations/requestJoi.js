const joi = require('joi');

module.exports = {
  createRequest: (() => {
    return joi.object().keys({
      traineeId: joi.string().required().min(3).max(40),
      instructorId: joi.string().required().min(3).max(40),
      status: joi.string().valid("accepted", "rejected", "pending"),
    })//.unknown(); // unknow allow to add
  })(),


  pagination: (() => {
    return joi.object().keys({
      pageNo: joi.number().default(1).greater(0),
      limit: joi.number().default(10).valid(5, 10, 15, 20, 30, 40, 50, 100),
      sortValue: joi.string().valid("traneeId", "instructorId", "status").default('traineeId'),
      sortOrder: joi.valid("ASC", "DESC").default("DESC"),
      search: joi.object(),
    })
  })(),
  
}

//.nand('email', 'userId')