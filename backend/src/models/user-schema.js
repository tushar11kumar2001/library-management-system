const  mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    
    fullName : {
        type : String,
        require : true
    }, 

    emailId : {
         type : String,
         require : true,
         unique: true,
         trim : true,
         lowercase : true,
         maxLength : 50,
         validate(value){
                   if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com)/.test(value)) throw new Error("Please enter a VALID EMAIL!!")
         }
    },

    password : {
        type : String,
        require : true,
        validate(value){
               if(!/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value)) throw new Error("Password should be contain one uppercase, one special character and length should be at least 6")
        }
    },
    borrowedBook : {
        type : [mongoose.Schema.Types.ObjectId],
        default : [null],
        validate(value){
            if(value.length > 3) throw new Error("You can borrow only 3 book");
        }
    },
    lastLogin : {
        type : Date,
        default : null
    }
    
},
{
    timestamps : true
}
);

userSchema.statics.hashing = async (passwordInputFromUser)=>{
      return await bcrypt.hash(passwordInputFromUser, 10)
};

userSchema.methods.comparePassword = async function (passwordInputFromUser){
    const user = this;
    return await bcrypt.compare(passwordInputFromUser, user.password);
}

module.exports  = mongoose.model("users", userSchema);
