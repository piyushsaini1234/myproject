const express = require("express");
const loginRouter = express.Router();
const login = require("../../../Controller/NgoPartner/Login/Login");

loginRouter.post("/api/ngopartner/login", login);

module.exports = loginRouter;
