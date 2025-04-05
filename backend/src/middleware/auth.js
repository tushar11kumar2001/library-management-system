const UserModel = require("../models/user-schema");
module.exports.userAuth = async (req, res, next)=>{
      try{
        const { libraryAccessToken } = req.cookies;
        if( !libraryAccessToken ) throw new Error("Session Expire !!");
        
        const _id = UserModel.verifyToken(libraryAccessToken);
        const loggedInUser = await UserModel.findOne({ _id });
        if(!loggedInUser) throw new Error("Session Expire !!");
        
        req.user = loggedInUser;
        next();
        

      }catch(err){
        res.
        status(400).
        json({MESSAGE : err.message});
    }
}