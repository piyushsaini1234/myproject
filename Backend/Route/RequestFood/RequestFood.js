const express = require("express");
const Router = express.Router();

const { postRequestFood } = require('../../Controller/RequestFood/RequestFood');
Router.post('/api/Requestfood', postRequestFood); 

const { getRequestFood } = require('../../Controller/RequestFood/RequestFood');
Router.get('/api/Requestfood', getRequestFood);



module.exports = Router;
