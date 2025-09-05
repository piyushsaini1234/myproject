const express = require("express");
const Router = express.Router();

const { postDonateFood,getDonateFood  } = require('../../Controller/DonateFood/DonateFood');


Router.post('/api/Donatefood', postDonateFood); 
Router.get('/api/DonateFood',getDonateFood)

module.exports = Router;
