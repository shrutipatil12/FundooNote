require('dotenv').config()
var aws = require('aws-sdk')
var express = require('express')

//middleware for handling form-data.
var multer = require('multer')
var multerS3 = require('multer-s3')
 
var app = express()

var config = {
    accessKeyId : process.env.accessKeyId,
    secretAccessKey : process.env.secretAccessKey,
    region  : process.env.region
}
var s3 = new aws.S3(config)
 
var upload = multer({
  storage: multerS3({
     s3,
    bucket:'fundoonotebucket',
    acl:'public-read',
    metadata: function (req, file, callback) {
       callback(null, {fieldName:"image"});
    },
    key: function (req, file, callback) {
       callback(null, Date.now().toString())
    }
  })
})

module.exports=upload;