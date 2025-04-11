const express = require("express");
const { loginAdmin } = require("../controllers/admin-controller");

const AdminRouter = express.Router();

AdminRouter.post("/admin/login", loginAdmin)

module.exports = AdminRouter;