/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :server.js
 *  @author         :Shruti
 *  @version        :1.0
 ******************************************************************************/
const express = require('express');
const cors = require('cors');

/** @description middleware for handling JSON, Raw, Text and URL encoded form data. */
const bodyParser = require('body-parser');

var routes = require('../server/router/route')
var ctrl = require('./controller/userController')

/** @description require the mongoose.Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment */
const mongoose = require('mongoose');

/** @description Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env */
require('dotenv').config()
const app = express();
require('http').createServer(app);
var redisEvent = require('../server/services/internalServices/redisServices')
var mongooseEvents = require('../server/services/internalServices/mongooseServices');
//var logger=require('../server/services/internalServices/loggerServices')
mongooseEvents.mongoose();
redisEvent.redisEvent();
app.use(cors());
//logger.loggerEvent();

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({
    extended: true
}))

/** 
 * @description: convert the text as JSON and show the resulting object.
 */
app.use(bodyParser.json());

/** @description express-validator for server-side data validation. */
var expressValidator = require('express-validator')
app.use(expressValidator());
app.use('/', routes)

/** @description Connections to the server */
var server = app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})
module.exports = app;