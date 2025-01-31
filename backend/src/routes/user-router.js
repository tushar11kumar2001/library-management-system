const express = require("express");
const { signupUser, loginUser } = require("../controllers/user-controllers");

const userRouter = express.Router();

userRouter.post("/user/signup",signupUser);
userRouter.post("/user/login",loginUser);

module.exports = userRouter;