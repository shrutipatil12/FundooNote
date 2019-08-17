
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :loggerServices.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

class loggerServicesClass{
    loggerEvent(){
var expressWinston = require('express-winston');
var winston = require('winston')
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));
}
}
var loggerObject=new loggerServicesClass();
module.exports=loggerObject;