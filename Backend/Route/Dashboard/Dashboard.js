const express = require("express");
const  DashboardRoute = express.Router();
const { getDashboard } = require("../../Controller/Dashboard/Dashboard");

 DashboardRoute.get("/api/dashboard", getDashboard);

module.exports = DashboardRoute;
