const userService = require('../services/userService');
const userSchema = require("../utils/joiValidations/userJoi");
const paginationSchema = require("../utils/joiValidations/paginationJoi");
// const joi = require('joi');

// const getUser = joi.object().keys({
//   email: joi.any(),
//   userId: joi.any()
// })
//.nand('email', 'userId');

module.exports = {
  createUser: async (req, res) => {
    try {
      const validate = await userSchema.createUser.validateAsync(req.body);
      const user = await userService.createUser(validate);
      if (user.error) {
        return res.send({
          error: user.error,
        });
      }
      return res.status(201).send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const validate = await userSchema.pagination.validateAsync(req.query);
      const users = await userService.getAllUsers(validate);
      if (users.error) {
        return res.send({
          error: users.error,
        });
      }
      return res.send({
        response: users.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },

  getUser: async (req, res) => {
    try {
      const validate = await userSchema.getUser.validateAsync(req.query);
      console.log("chech ", validate)
      const user = await userService.getUser(validate);
      if(user.error){
        res.send({ error: user.error })
      }
      return res.send({ response: user.response }) 
    } catch (error) {
      return { error: error }
    }
  },

  deleteUser: async (req, res) => {
    try {
      const validate = await userSchema.getByUserId.validateAsync(req.query);
      const user = await userService.deleteUser(validate);
      if (user.error) {
        return res.send({
          error: user.error,
        });
      }
      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
  
  updateUser: async (req, res) => {
    try {
      const validate = await userSchema.updateUser.validateAsync(req.body);

      const user = await userService.updateUser(validate);
      if (user.error) {
        return res.send({
          error: user.error,
        });
      }
      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        error: error,
      });
    }
  },
}