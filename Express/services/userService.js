const userModel = require('../models/userModel');
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const { models } = require('../models');

module.exports = {
  createUser: async (body) => {
    try {
      const userId = uuidV4();
      const isUser = await userModel.getUserByEmail(body.email);
      if (isUser.response || isUser.error) {
        return {
          error: "user with email already exists",
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
      const users = await userModel.getAllUsers(offset, query.limit)
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
  userUpdate: () => {
    try{
      const userUpdateResponse = userModel.userUpdate();
      console.log(userUpdateResponse)
      if(userUpdateResponse.error){
        return { error: userUpdateResponse.error }
      }
      return { response: userUpdateResponse.response }
    }catch(error){
      return { errror: error }
    }
  },
  
}