const UserModel = require("../models/user-schema");

module.exports.createNewUser = async ({fullName, emailId, password})=>{
    return await new UserModel({fullName, emailId, password}).save();
}