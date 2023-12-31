const jwt = require("jsonwebtoken")
const config = require("./config/config.json")
const sessionModel = require("./models/sessionModel")
const userModel = require("./models/userModel")

module.exports = {
  authenticate_user: async (req, res, next) => {
    const authHeader = req.headers['authorization']
    console.log("🚀 ~ file: middleware.js:9 ~ authenticate_user: ~ authHeader🔻:", authHeader)
    if(!!!authHeader) {
      return res.status(401).send({
        error: "Unauthorized....", message: "Please login into your account first.",
      })
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      config.jwt.access_token_secret,
      (err, decoded) => {
        if(err){
          return res.status(403).send({
            error: "Forbidden", message: "Your access token has expired. Please login into your account first.",
          })
        }
        console.log("🚀 ~ file: middleware.js:16 ~ authenticate_user: ~ decoded🔻:", decoded)
        req.user = decoded;
        next();
      }
    )

  //   const token = req.cookies.authToken
  //   if(!token || token == undefined){
  //     return res.status(401).send({
  //       error: "Unauthorized:401", message: "Please login into your account first.",
  //     })
  //   }

  //   try {
  //     const user = jwt.verify(token, config.jwt.secret);
  //     res.locals.user = user;
  //     next();
  //  } catch (err) {
  //     if (err instanceof jwt.TokenExpiredError) {
  //       const decoded = jwt.decode(token);
        
  //       const deleteSession = await sessionModel.deleteSession(decoded.userId)
  //       if(deleteSession.error){ 
  //         console.log("Session not found to delete after token expiration.") 
  //       }else{ console.log("Session deleted after token expiration.")}

  //       return res.status(401).send({ error: "Unauthorized:401", message: 'Access denied. Token has expired.' });
  //     }
  //     return res.status(500).json({ message: 'Internal server error.' });
  //  }
  },
  sessionCheck: async (req, res, next) => {
    try{
      const user = await userModel.getUserByEmail(req.body.email);
      res.user = user;
      if(user.response){
        const userId = user.response.dataValues.userId;
        const session = await sessionModel.getSessionByUserId(userId);
        if(session.response){
          if(req.cookies.authToken === session.response.dataValues.token)
            return res.status(401).send({error: "Unauthorized", message: 'You are already signIn',})
          if(session.response.dataValues.expireAt > new Date())
            return res.status(401).send({error: "Unauthorized", message: 'You are already signIn from other device',})
        }
      }
      next()
    }catch(error){
      console.log("🚀 ~ file: middleware.js:46 ~ sessionCheck: ~ error🔻:", error)
      return res.send({
        error: "Error: something went wrong.",
      })
    }
  },
  admin: async(req, res, next) => {
    try{
      const user = req.user 
      if(!user)return res.status(401).send({ error: "Unauthorized", message: 'Please login into your account first.' });

      if(user.role !== "admin"){
        return res.status(403).send({
          error: "Forbidden:403", message: "You are not an Admin."
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
      const user = req.user 
      if(!user)return res.status(401).send({ error: "Unauthorized", message: 'Please login into your account first.' });

      if(user.role !== "trainee"){
        return res.status(403).send({
          error: "Forbidden:403", message: "You are not a Trainee."
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
      const user = req.user
      if(!user)return res.status(401).send({ error: "Unauthorized....", message: 'Please login into your account first.' });

      if(user.role !== "instructor"){
        return res.status(403).send({
          error: "Forbidden:403", message: "You are not an Instructor"
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