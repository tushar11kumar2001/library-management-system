const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    userId : {
      type: Number,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    emailId: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: 50,
      validate(value) {
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.(com)/.test(value))
          throw new Error("Please enter a VALID EMAIL!!");
      },
    },

    password: {
      type: String,
      require: true,
      validate(value) {
        if (!/^(?=.*[A-Z])(?=.*[\W_]).{6,}$/.test(value))
          throw new Error(
            "Password should be contain one uppercase, one special character and length should be at least 6"
          );
      },
    },
    department : {
        type : String,
        require : true,
        enum : {
          values : ["CSE", "IT", "ECE", "EEE"],
          message : "{VALUE} is not a valid department"
        }
    },
    borrowedBook: {
      type: [
        {
          bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "books",
          },
          dueTo: {
            type: Date,
            default: ()=>new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
          },
        },
      ],
      default: [],
      validate: [
        {
          validator: (value) => {
            return value.length <= 3;
          },
          message: "You can borrow only 3 book",
        },
        {
          validator: (value) => {
            const ids = value.map((e) => e.bookId.toString());
            const uniqueId = new Set(ids);
            return value.length === uniqueId.size;
          },
          message: "User already borrow this book",
        },
      ],
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.hashing = async (passwordInputFromUser) => {
  return await bcrypt.hash(passwordInputFromUser, 10);
};

userSchema.methods.comparePassword = async function (passwordInputFromUser) {
  const user = this;
  return await bcrypt.compare(passwordInputFromUser, user.password);
};

userSchema.methods.getJWT = function () {
  const user = this;
  return jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);
};

userSchema.statics.verifyToken = function (inComingToken) {
  return jwt.verify(inComingToken, process.env.PRIVATE_KEY);
};

module.exports = mongoose.model("users", userSchema);
