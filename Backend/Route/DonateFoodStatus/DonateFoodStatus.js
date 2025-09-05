const express = require("express");
const router  = express.Router();

const { getDonateFoodStatus} = require("../../Controller/DonateFoodStatus/DonatefoodStatus");
router.get("/api/donatefoodstatus", getDonateFoodStatus);

module.exports = router ;
