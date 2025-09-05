const express = require("express");
const { getUserStatus } = require("../../Controller/User/Userstatus");

const router = express.Router();


router.get("/api/status", getUserStatus);

module.exports = router;
