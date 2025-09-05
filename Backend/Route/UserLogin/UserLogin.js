const express = require("express");
const UserLoginRouter = express.Router();
const UserLogin = require("../../Controller/User/UserLogin/UserLogin");

UserLoginRouter.post("/api/UserLogin", UserLogin);

module.exports = UserLoginRouter;
