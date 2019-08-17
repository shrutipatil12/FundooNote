
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :uploadPhoto.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
require('dotenv').config()
var aws = require('aws-sdk')
var express = require('express')

//middleware for handling form-data.
var multer = require('multer')
var multerS3 = require('multer-s3')
 
var config = {
    accessKeyId : process.env.accessKeyId,//Get the accesskey from .env file
    secretAccessKey : process.env.secretAccessKey,//Get the secretAccessKey from .env file
    region  : process.env.region//Get the region from .env file
}
var s3 = new aws.S3(config)
 
var upload = multer({
  storage: multerS3({
     s3,
    bucket:'fundoonotebucket',//Bucket name
    acl:'public-read',//To manage and access the bucket object and data
    metadata: function (req, file, callback) {
       callback(null, {fieldName:"image"});
    },
    key: function (req, file, callback) {
       callback(null, Date.now().toString())
    }
  })
})

module.exports=upload;