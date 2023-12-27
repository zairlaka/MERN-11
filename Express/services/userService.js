const userModel = require('../models/userModel');
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { models } = require('../models');

module.exports = {
  createUser: async (body) => {
    try {
      const userId = uuidV4();
      const isUser = await userModel.getUserByEmail(body.email);
      if (isUser.response) {
        return {
          error: "User with this email is already exists",
        };
      }

      delete body.confirmPassword;
      body.password = await bcrypt.hash(body.password, 10);
      const user = await userModel.createUser(body, userId);
      if (user.error) {
        return {
          error: user.error,
        };
      }

      delete user.response.dataValues.password;
      return {
        response: user.response,
      };
    } catch (error) {
      return {
        error: error,
      };
    }
  },
  deleteUser: async (query) => {
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
  getAllUsers: async (query) => {
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
  getUser: async (query) => {
    try {
      let user;
      let [email, userId] = [query.email, query.userId]
      if(!!!email && !!!userId)
        return { error: "Please provide email or userId."}
      if(email){
        user = await userModel.getUserByEmail(email)
      }else{
        user = await userModel.getUserById(userId)
      }
      if(user.error){
        return { error: user.error }
      }
      return { response: user.response }
    } catch (error) {
      return { error: error }
    }
  },
  
  updateUser: async (body) => {
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
  getAllInstructors: async () => {
    try{
      const users = await userModel.getAllInstructors()
      if(users.error){
        return { error: users.error}
      }
      return { response: users.response }
    }catch(error){
      console.log("🚀 ~ file: userService.js:109 ~ getAllInstructors: ~ error🔻:", error)
      return { error: error }
    }
  },
  
}