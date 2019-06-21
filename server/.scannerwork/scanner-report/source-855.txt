/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :authentication.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var express = require("express")
var router = express.Router();
var user = require('../controller/regController')
var auth = require('../authentication/tokenVerify')
module.exports = router;