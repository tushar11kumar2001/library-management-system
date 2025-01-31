const validator = require("validator");

module.exports.validateSignUpData = ({ emailId, password })=>{
      if(!validator.isEmail(emailId)) throw new Error("Please enter a VALID EMAIL!!");
      else if(!validator.isStrongPassword(password)) throw new Error("Password should be contain one uppercase, one special character and length should be at least 6");     
}
