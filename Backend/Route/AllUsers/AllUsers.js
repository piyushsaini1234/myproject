const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../Controller/Allusers/Allusers.js');


router.get('/api/allusers', getAllUsers);

module.exports = router;
