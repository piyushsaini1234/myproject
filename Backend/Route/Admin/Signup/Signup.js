const express = require("express");
const AdminSignupRouter = express.Router();
const AdminSignup = require("../../../Controller/Admin/Signup/Signup");

AdminSignupRouter.post("/api/AdminSignup", AdminSignup);

module.exports = AdminSignupRouter;