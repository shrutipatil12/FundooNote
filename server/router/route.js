
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :route.js
 *  @author         :Shruti
 *  @version        :1.0

 ******************************************************************************/
var express = require('express');
var userCtrl = require('../controller/regController')
var userModel=require('../model/regModel')
var router = express.Router();
var verify = require('../authentication/tokenVerify')
var upload=require('../middleWare/uploadProfile')
var redis=require('../authentication/redisToken')

console.log("router");

//login API
router.post('/login', userCtrl.login);

//registeration API
router.post('/register',userCtrl.register);

//Verification API
router.post('/isVerified',redis.checkRedisToken,userCtrl.isVerified);

//reset password API
router.post('/reset', verify.checkToken, userCtrl.reset);

//router.verify=require('../authentication/tokenVerify')
const authentication = require('./authentication');
router.use('/authentication', authentication);

//forget password API
router.post('/forget', userCtrl.forgetPassword);

//postUrl API
router.post('/postUrl', userCtrl.postUrl);

//getUrl API
router.post('/getUrl', userCtrl.getUrl);

//uploadPhoto API
router.post('/uploadPhoto',upload.single('image'),userCtrl.uploadPhoto);
module.exports = router;