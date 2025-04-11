const AdminModel = require("../models/admin-schema");
const { validateSignUpData } = require("../utils/validateDataFromUser");

module.exports.loginAdmin = async (req, res)=>{
    try{
        const { emailId, password } = req.body;
        validateSignUpData({ emailId, password });
        const loggedInAdmin = await AdminModel.findOne({ emailId });
        if(!loggedInAdmin) throw new Error("INVALID CREDIANTIALS email!!");

        // const isValid = await loggedInAdmin.comparePassword(password);
        // if(!isValid) throw new Error("INVALID CREDIANTIALS password!!");

        if(password !== loggedInAdmin.password) throw new Error("INVALID CREDIANTIALS password!!");
        const token = loggedInAdmin.getJWT();
        
        res
        .status(200)
        .cookie("libraryAdminToken", token, { expires : new Date(Date.now() + 60*60*1000 )} )
        .json({
                message : "Admin log in  successfully",
                data : loggedInAdmin
            })
    }catch(err){
        res
        .status(400)
        .json({MESSAGE : err.message});
    }
};