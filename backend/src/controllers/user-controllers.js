const { createNewUser } = require("../services/user-service");
const { validateSignUpData } = require("../utils/validateDataFromUser");
const UserModel = require("../models/user-schema");
module.exports.signupUser = async (req, res)=>{
    try{
        const { fullName, emailId, password } = req.body;
        validateSignUpData({ emailId, password });
        const existingUser = await UserModel.findOne({emailId});
        if(existingUser){
            return res.status(400).json({
                message : "User already exist!!"
            })
        }
        const newUser = await createNewUser({fullName, emailId, password});
        if(!newUser) throw new Error;   
        
        res.send(newUser);
    }catch(err){
        res.status(400).json({MESSAGE : err.message});
    }
    
}