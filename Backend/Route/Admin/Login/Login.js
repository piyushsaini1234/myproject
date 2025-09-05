const express = require("express");
const AdminLoginRouter = express.Router();
const AdminLogin = require("../../../Controller/Admin/Login/Login");

AdminLoginRouter.post("/api/AdminLogin", AdminLogin);

module.exports = AdminLoginRouter;
