const userService = require('../services/userService');

module.exports = {
  userDetails: (req, res) => {
    try{
      const userDetailsResponse = userService.userDetails();
      if(userDetailsResponse.error){
        res.send({ error: userDetailsResponse.error })
      }
      res.send({ response: userDetailsResponse.response })
    }catch(error){
      res.send({ error: error })
    }
  },
  userCreate: (req, res) => {
    try{
      const userCreateResponse = userService.userCreate();
      if(userCreateResponse.error){
        res.send({ error: userCreateResponse.error })
      }
      res.send({ response: userCreateResponse.response })
    }catch(error){
      res.send({ error: error })
    }
  },
  userUpdate: (req, res) => {
    try{
      const userUpdateResponse = userService.userUpdate();
      if(userUpdateResponse.error){
        res.send({ error: userUpdateResponse.error })
      }
      res.send({ response: userUpdateResponse.response })
    }catch(error){
      res.send({ error: error })
    }
  },
  userDelete: (req, res) => {
    try{
      const userDeleteResponse = userService.userDelete();
      if(userDeleteResponse.error){
        res.send({ error: userDeleteResponse.error })
      }
      res.send({ response: userDeleteResponse.response })
    }catch(error){
      res.send({ error: error })
    }
  },
  
}