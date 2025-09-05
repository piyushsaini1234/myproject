const express = require('express');
const AllNGOsRoute = express.Router();
const {getAllNGOs} = require('../../Controller/AllNGOs/NGOs');

AllNGOsRoute.get('/api/allngos', getAllNGOs);

module.exports = AllNGOsRoute;
