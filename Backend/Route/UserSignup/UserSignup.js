const express = require("express");
const UserSignupRouter = express.Router();
const UserSignup= require("../../Controller/User/UserSignup/UserSignup");

UserSignupRouter.post("/api/UserSignup", UserSignup);

module.exports = UserSignupRouter;
