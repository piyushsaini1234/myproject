const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../Controller/AllUsers/AllUsers');


router.get('/api/allusers', getAllUsers);

module.exports = router;
