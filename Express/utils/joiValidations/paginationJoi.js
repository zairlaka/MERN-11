const joi = require('joi');

module.exports = {
  pagination: (() => {
    return joi.object().keys({
      pageNo: joi.number().required().greater(0),
      limit: joi.number().required().valid(5, 10, 15, 20, 30, 40, 50, 100),
    })
  })(),
  
}