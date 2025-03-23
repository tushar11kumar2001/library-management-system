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
        const hashPassword = await UserModel.hashing(password);
        const newUser = await createNewUser(
            {
              fullName, 
              emailId, 
              password : hashPassword
            });
        if(!newUser) throw new Error;   
        
        res.
        status(200).
        json({
            message : "User register successfully",
            data : newUser
        })
    }catch(err){
        res.
        status(400).
        json({MESSAGE : err.message});
    }
    
};

module.exports.loginUser = async (req, res)=>{
    try{
        const { emailId, password } = req.body;
        validateSignUpData({ emailId, password });
        const loggedInUser = await UserModel.findOne({ emailId });
        if(!loggedInUser) throw new Error("INVALID CREDIANTIALS !!");

        const isValid = await loggedInUser.comparePassword(password);
        if(!isValid) throw new Error("INVALID CREDIANTIALS !!");

        loggedInUser.lastLogin = new Date();
        await loggedInUser.save();
        res.
        status(200).
        json({
                message : "User log in  successfully",
                data : loggedInUser
            })
    }catch(err){
        res.
        status(400).
        json({MESSAGE : err.message});
    }
};

module.exports.userInSystem = async(req, res)=>{
    try{ 
        const { option } = req.params;
        const days = req.query.day;
        const lastDate = new Date();
        lastDate.setDate(lastDate.getDate() - days);
        let totalUsers;
        
        if(option === "total") totalUsers = await UserModel.find({});
        else if(option === "active") totalUsers = await UserModel.find({lastLogin : { $gte : lastDate }});
        else if(option === "new") totalUsers = await UserModel.find({createdAt : { $gte : lastDate }});

        res.
        status(200).
        json({
                message : option === "total" ? "Total user in Database" : `Total ${option} user in last ${days} Days`,
                data : totalUsers
            })
    }catch(err){
        res.
        status(400).
        json({MESSAGE : err.message});
    }

}
