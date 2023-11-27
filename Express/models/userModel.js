module.exports = {
  userDetails : () => {
    try{
      return { response: 'This is user details.'}
    }catch(error){
      return { error: error }
    }
  },
  userCreate : () => {
    try{
      return { response: 'New User has been Created.'}
    }catch(error){
      return { error: error }
    }
  },
  userUpdate : () => {
    try{
      return { response: 'This is user has been updated.'}
    }catch(error){
      return { error: error }
    }
  },
  userDelete : () => {
    try{
      return { response: 'This is user has been deleted.'}
    }catch(error){
      return { error: error }
    }
  }
}