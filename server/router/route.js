
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :route.js
 *  @author         :Shruti
 *  @version        :1.0

 ******************************************************************************/
var express = require('express');
var userCtrl = require('../controller/userController')
var shortUrlCtrl = require('../controller/shortUrlController')
var userModel = require('../model/userModel')
var router = express.Router();
var verify = require('../authentication/tokenVerify')
var upload = require('../middleWare/uploadProfile')
var redis = require('../authentication/redisToken')
var noteCtrl = require('../controller/noteController')
var labelCtrl=require('../controller/labelController')
console.log("router");

/** @description login API */
router.post('/login', userCtrl.login);

/** @description registeration API */
router.post('/register', userCtrl.register);

/** 
 * @description Verification API
 */
router.post('/isVerified', verify.checkToken, userCtrl.isVerified);

/** @description forget password API */
router.post('/forget', userCtrl.forgetPassword);

/** @description reset password API */
router.post('/reset/:token',  verify.checkToken, userCtrl.reset);

//router.verify=require('../authentication/tokenVerify')
const authentication = require('./authentication');
router.use('/authentication', authentication);



/** @description postUrl API */
router.post('/postUrl', shortUrlCtrl.postUrl);

/** @description getUrl API */
router.post('/getUrl', shortUrlCtrl.getUrl);


/** @description uploadPhoto API*/
router.post('/uploadPhoto', upload.single('image'), userCtrl.uploadPhoto);

router.get('/getAllNote', verify.checkToken, noteCtrl.getAllNote);


/** @description createNote API*/
router.post('/createNote',redis.checkRedisToken, noteCtrl.createNote);

/** @description trashNote API*/
router.post('/trashNote', verify.checkToken,noteCtrl.trashNote);

/** @description archivesNote API*/
router.post('/archivesNote', verify.checkToken,noteCtrl.archivesNote);

/** @description reminderNote API*/
router.post('/reminderNote',redis.checkRedisToken, noteCtrl.reminderNote);

/** @description searchNote API*/
router.post('/searchNote', redis.checkRedisToken,noteCtrl.searchNote);



/** @description createLabel API*/
router.post('/createLabel',redis.checkRedisToken, labelCtrl.createLabel);

/** @description getLabel API*/
router.post('/getLabel',redis.checkRedisToken, labelCtrl.getLabel);

/** @description UpdateLabel API*/
router.post('/updateLabel',redis.checkRedisToken, labelCtrl.updateLabel);

/** @description deleteLabel API*/
router.post('/deleteLabel',redis.checkRedisToken, labelCtrl.deleteLabel);

/** @description addNoteInLabel API*/
router.post('/addNoteInLabel',redis.checkRedisToken, labelCtrl.addNoteInLabel);

/** @description deleteNoteFromLabel API*/
router.post('/deleteNoteFromLabel',redis.checkRedisToken, labelCtrl.deleteNoteFromLabel);

/** @description getAllTrashLabel API*/
router.post('/getAllTrashNote',redis.checkRedisToken, noteCtrl.getAllTrashNote);

/** @description getAllArchivesLabel API*/
router.get('/getAllArchivesNote', verify.checkToken, noteCtrl.getAllArchivesNote);








module.exports = router;