const requestModel = require('../models/requestModel');
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { models } = require('../models');

module.exports = {
  createRequest: async (body) => {
    try {
      // const isRequested = await userModel.getUserByEmail(body.email);
      // if (isRequested.response) {
      //   return {
      //     error: "Request is already sent",
      //   };
      // }

      const request = await requestModel.createRequest(body);
      if (request.error) {
        return {
          error: request.error,
        };
      }
      return {
        response: request.response,
      };
    } catch (error) {
      console.log("🚀 ~ file: requestService.js:26 ~ createRequest: ~ error🔻:", error)
      return {
        error: error,
      };
    }
  },
  deleteRequest: async (query) => {
    try{
      const user = await userModel.deleteUser(query.userId)
      if(user.error){
        return { error: user.error}
      }
      return { response: user.response }
    }catch(error){
      return { error: error }
    }
  },
  getAllRequests: async (query) => {
    try{
      const offset = (query.pageNo - 1) * query.limit;
      const users = await userModel.getAllUsers(offset, query)
      if(users.error){
        return { error: users.error}
      }
      return { response: users.response }
    }catch(error){
      return { error: error }
    }
  },
  
  updateRequest: async (body) => {
    try{
      const isUser = await userModel.getUserById(body.userId);
      if (!isUser.response || isUser.error) {
        return {
          error: "User does not exists.",
        };
      }
      delete [body.email, body.role, body.userId]
      delete body.email
      delete body.role
      
      // delete body.role;
      const user = await userModel.updateUser(body)
      if(user.error){
        return { error: user.error}
      }
      return { response: user.response }
    }catch(error){
      return { errror: error }
    }
  },
  
}