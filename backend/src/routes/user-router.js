const express = require("express");
const { signupUser, loginUser, userInSystem, userAction } = require("../controllers/user-controllers");
const { userAuth } = require("../middleware/auth");

const UserRouter = express.Router();

UserRouter.post("/user/signup", signupUser);
UserRouter.post("/user/login", loginUser);
UserRouter.get("/user/system/:category",  userInSystem);  //add authentication here both use and admin
UserRouter.patch("/user/:userId/:action/:bookId", userAction) // admin auth

module.exports = UserRouter;