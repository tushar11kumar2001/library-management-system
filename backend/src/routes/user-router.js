const express = require("express");
const { signupUser, loginUser, userInSystem, userAction } = require("../controllers/user-controllers");
const { userAuth } = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/user/signup", signupUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/user/system/:category", userAuth, userInSystem);
userRouter.patch("/user/:userId/:action/:bookId", userAction) // admin auth

module.exports = userRouter;