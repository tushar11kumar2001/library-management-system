const express = require("express");
const { loginAdmin, adminAction, updatePassword } = require("../controllers/admin-controller");

const AdminRouter = express.Router();

AdminRouter.post("/admin/login", loginAdmin); 

AdminRouter.patch("/admin/updatepassword", updatePassword);

AdminRouter.patch("/admin/:userId/:action/:bookId", adminAction); // admin auth

module.exports = AdminRouter;