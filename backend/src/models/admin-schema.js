const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    defaultPasswordChanged : {
        type : Boolean,
        default : false
    }

}, {
    timestamps: true
});

adminSchema.methods.comparePassword = async function(passwordInputFromUser){
    const user = this;
    return await bcrypt.compare(passwordInputFromUser, user.password);
};

adminSchema.statics.hashing = async function(passwordInputFromUser){
    return await bcrypt.hash(passwordInputFromUser, 10);
};

adminSchema.methods.getJWT = function(){
    const user = this;
    return jwt.sign({_id : user._id }, process.env.PRIVATE_KEY)
}
module.exports = mongoose.model('admins', adminSchema);