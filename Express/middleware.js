const jwt = require("jsonwebtoken")
const config = require("./config.json")
const sessionModel = require("./models/sessionModel")
const userModel = require("./models/userModel")

module.exports = {
  authorize: async (req, res, next) => {
    const token = req.cookies.authToken
    if(!token || token == undefined){
      return res.status(401).send({
        error: "Unauthorized: Please login into your account first.",
      })
    }

    try {
      const user = jwt.verify(token, config.jwt.secret);
      res.locals.user = user;
      next();
   } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        const decoded = jwt.decode(token);
        
        const deleteSession = await sessionModel.deleteSession(decoded.userId)
        if(deleteSession.error){ 
          console.log("Session not found to delete after token expiration.") 
        }else{ console.log("Session deleted after token expiration.")}

        return res.status(401).send({ error: "Unauthorized:401", message: 'Access denied. Token has expired.' });
      }
      return res.status(500).json({ message: 'Internal server error.' });
   }
  },
  sessionCheck: async (req, res, next) => {
    try{
      const user = await userModel.getUserByEmail(req.body.email);
      const userId = user.response.dataValues.userId;
      const session = await sessionModel.getSessionByUserId(userId);
      if(session.response){
        if(req.cookies.authToken === session.response.dataValues.token)
          return res.status(401).send({error: "Unauthorized:401", message: 'You are already signIn',})
        if(session.response.dataValues.expireAt > new Date())
          return res.status(401).send({error: "Unauthorized:401", message: 'You are already signIn from other device',})
      }
      next()
    }catch(error){
      return res.send({
        error: "Error: something went wrong.",
      })
    }
  },
  admin: async(req, res, next) => {
    try{
      const user = res.locals.user 
      if(!user)return res.status(401).send({ error: "Unauthorized:401", message: 'Please login into your account first.' });

      if(user.role !== "admin"){
        return res.status(403).send({
          error: "Forbidden: You are not an Admin"
        })
      }
      console.log("admin data ", user);
      next();
    }catch(error){
      return res.send({
        error: "Error: something went wrong.",
      })
    }
  },
  trainee: async(req, res, next) => {
    try{
      const user = res.locals.user 
      if(!user)return res.status(401).send({ error: "Unauthorized:401", message: 'Please login into your account first.' });

      if(user.role !== "trainee"){
        return res.status(403).send({
          error: "Forbidden: You are not an Trainee"
        })
      }
      next();
    }catch(error){
      return res.send({
        error: "Error: something went wrong.",
      })
    }
  },
  instructor: async(req, res, next) => {
    try{
      const user = res.locals.user 
      if(!user)return res.status(401).send({ error: "Unauthorized:401", message: 'Please login into your account first.' });

      if(user.role !== "instructor"){
        return res.status(403).send({
          error: "Forbidden: You are not an Instructor"
        })
      }
      next();
    }catch(error){
      return res.send({
        error: "Error: something went wrong.",
      })
    }
  },
}