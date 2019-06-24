
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :server.js
 *  @author         :Shruti
 *  @version        :1.0
 ******************************************************************************/
const express = require('express');

//middleware for handling JSON, Raw, Text and URL encoded form data.
const bodyParser = require('body-parser');
const dbConfig = require('../server/config/databaseconfig')
var routes = require('../server/router/route')
var ctrl = require('../server/controller/regController')
//require the mongoose.Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment
const mongoose = require('mongoose');
//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require('dotenv').config()
const app = express();
require('http').createServer(app);
var redis = require('redis');
var client = redis.createClient();


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }))

/** 
* @description: convert the text as JSON and show the resulting object.
*/
app.use(bodyParser.json());
// express-validator for server-side data validation.
var expressValidator = require('express-validator')
app.use(expressValidator());


app.use('/', routes)

var server = app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})


mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log(" DB connected successfully");
}).catch(err => {
    console.log(" DB could not connect", err);
    process.exit(0);
})

client.on('connect', function() {
    console.log('Redis client connected');
});

// var expressWinston = require('express-winston');
// var winston = require('winston')
// app.use(expressWinston.logger({
// transports: [
// new winston.transports.Console()
// ],
// format: winston.format.combine(
// winston.format.colorize(),
// winston.format.json()
// )
// }));
// app.use(expressWinston.errorLogger({
// transports: [
// new winston.transports.Console()
// ],
// format: winston.format.combine(
// winston.format.colorize(),
// winston.format.json()
// )
// }));

module.exports = app;
