
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :route.js
 *  @author         :Shruti
 *  @version        :1.0

 ******************************************************************************/
var express = require('express');
var userCtrl = require('../controller/regController')

var router = express.Router();
var verify = require('../authentication/tokenVerify')

console.log("router");

//login API
router.post('/login', userCtrl.login);

//registeration API
router.post('/register/',userCtrl.register);

//Verification API
router.post('/isVerified/:token',verify.checkToken,userCtrl.isVerified)

//reset password API
router.post('/reset/:token', verify.checkToken, userCtrl.reset);

//router.verify=require('../authentication/tokenVerify')
const authentication = require('./authentication');
router.use('/authentication', authentication);

//forget password API
router.post('/forget', userCtrl.forgetPassword);

module.exports = router;