const requestService = require('../services/requestService');
const requestSchema = require("../utils/joiValidations/requestJoi");


module.exports = {
  createResquest: async (req, res) => {
    try {
      const validate = await requestSchema.createRequest.validateAsync(req.body);
      const request = await requestService.createRequest(validate);
      if (request.error) {
        return res.send({
          error: request.error,
        });
      }
      return res.status(201).send({
        response: request.response,
      });
    } catch (error) {
      console.log("🚀 ~ file: requestController.js:19 ~ createResquest: ~ error🔻:", error)
      return res.send({
        error: error,
      });
    }
  },
  getAllRequests: async (req, res) => {
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

  getRequest: async (req, res) => {
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

  deleteRequest: async (req, res) => {
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
  
  updateRequest: async (req, res) => {
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