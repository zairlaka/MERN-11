const userModel = require('../models/userModel');

module.exports = {
  userDetails: () => {
    try{
      const userDetailsResponse = userModel.userDetails();
      console.log(userDetailsResponse)
      if(userDetailsResponse.error){
        return { error: userDetailsResponse.error }
      }
      return { response: userDetailsResponse.response }
    }catch(error){
      return { errror: error }
    }
  },
  userCreate: () => {
    try{
      const userCreateResponse = userModel.userCreate();
      console.log(userCreateResponse)
      if(userCreateResponse.error){
        return { error: userCreateResponse.error }
      }
      return { response: userCreateResponse.response }
    }catch(error){
      return { errror: error }
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
  userDelete: () => {
    try{
      const userDeleteResponse = userModel.userDelete();
      console.log(userDeleteResponse)
      if(userDeleteResponse.error){
        return { error: userDeleteResponse.error }
      }
      return { response: userDeleteResponse.response }
    }catch(error){
      return { errror: error }
    }
  },
  
}