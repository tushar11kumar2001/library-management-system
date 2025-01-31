const express = require("express");
const { signupUser } = require("../controllers/user-controllers");

const userRouter = express.Router();

userRouter.post("/user/signup",signupUser);

module.exports = userRouter;