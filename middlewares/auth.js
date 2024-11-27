const { validateToken } = require("../services/auth")

function checkforcookie(cookieName){
    return(req,res,next)=>{
      const cookievalue=req.cookies[cookieName]
      if(!cookievalue){
        return next()
      }
      try{
         const userPayload=validateToken(cookievalue)
         req.user=userPayload;
      }
      catch(error){}

      return next()
    }
}
module.exports={checkforcookie}