const express = require("express");
const { signupUser, loginUser, userInSystem } = require("../controllers/user-controllers");

const userRouter = express.Router();

userRouter.post("/user/signup",signupUser);
userRouter.post("/user/login",loginUser);
userRouter.get("/user/system/:option", userInSystem)

module.exports = userRouter;