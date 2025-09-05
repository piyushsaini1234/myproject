const express = require("express");
const signupRouter = express.Router();
const signup = require("../../../Controller/NgoPartner/Signup/Signup");

signupRouter.post("/api/ngopartner/signup", signup);

module.exports = signupRouter;
