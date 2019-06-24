
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :regModel.js
 *  @author         :Shruti
 *  @version        :1.0

 ******************************************************************************/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validate = require('mongoose-validator');


const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

/**
* @description    : moongoose validations used for give validations for schema 
*/


var firstnameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 30],
        message: "name should be in correct format",
        httpStatus: 400
    })
]
var emailValidator = [
    validate({
        validator: "isEmail",
        message: "email should be in correct format",
        httpStatus: 400
    })
]
/**
 * @description:Create schema
 */

var mongooseSchema = mongoose.Schema;
var userData = mongooseSchema({
    "firstname": {
        type: String,
        validate: firstnameValidator,
        required: [true, "firstname is require"]
    },
    "email": {
        type: String,
        validate: emailValidator,
        required: [true, "email is require"]
    },
    "password": {
        type: String,

        required: [true, "password is require"]
    },
    "isVerified": {
        type: Boolean,
        default: false
    }
});


var user = mongoose.model('user', userData);
/**
 * @description: adding encryption to password
 * @param {*} password 
 */
function hashing(password) {
    var hash = bcrypt.hashSync(password, 10);
    return hash;

}


module.exports.register = (req, callback) => {
    try {
        // console.log('inside model', req);

        /**
        * @description: check the email address and if already present throw error
        */
        user.findOne({ 'email': req.email }, function (err, data) {
            console.log("47 rm", req.password);

            if (err) {
                console.log(err);
                return callback(err)

            }
            else if (data != null) {
               // console.log("sss", err)
                console.log('Email id exist');
                return callback(err)

            } else {
                /**
                 * @description: if email address is not present save the registered user details
                */
                req.password = hashing(req.password)
                console.log("register firstnm 69", req.firstname)
                const newUser = new user(
                    {
                        "firstname": req.firstname,
                        "email": req.email,
                        "password": req.password
                    })
                console.log("register firstnm", req.firstname)
                newUser.save(function (err, data) {
                    if (err) {
                        return callback(err);
                    } else {
                        console.log('inside saved');

                        console.log("84 rm")
                        return callback(null, data);
                    }
                });

            }
        })

    }
    catch (err) {
        /** 
        * @description:Handle the exception
        */
       console.log("error in catch register",err);
       
        res.send(err);
    }
}

module.exports.login = (req, callback) => {
    try {
        console.log("model 106", req.email);
        /**
         * @description: check the email address and if already present throw error
        */
        user.findOne({ 'email': req.email }, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err)
            }
            else if (result != null) {
                console.log("result after finding data: ", result);

                /**
                 * @description: compare the database password with the user entered password
                */
                bcrypt.compare(req.password, result.password, function (err, res) {
                    console.log("result   ", res)
                    if (err) {
                        console.log("error in model: ", err);

                        callback(err)
                    }
                    else {
                        /** 
                         * @description:show result if data is correct
                        */
                        console.log("Login successfully");
                        callback(null, res);
                    }

                })
            }
            else {
                /** 
                 * @description:else print the error message
                 */

                console.log("Enter correct data")
                callback(err);
            }


        })
    }
    catch (err) {
        /** 
        * @description:Handle the exception
        */
       console.log("error in catch login",err);

        res.send(err);
    }
}


module.exports.forgetPassword = (res, callback) => {
    try {
        /** 
       * @description:check the email address
       */
        user.findOne({ "email": res.body.email }, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                /** 
       * @description:check the registered email address with the email address entered while forget password
       */

                if (result !== null && res.body.email == result.email) {
                    callback(null, result)

                }
                else {
                    callback("incorrect Email");
                }

            }
        })
    }
    catch (err) {
        /** 
        * @description:Handle the exception
        */
       console.log("error in catch forgetPassword",err);

        res.send(err);
    }
}




module.exports.reset = (res, callback) => {
    try {
        /** 
       * @description:generate a hash password for new password
       */
        let newPassword = hashing(res.body.password)
        console.log("new pswd", newPassword);
        console.log(JSON.stringify(res.decoded))
        /** 
      * @description: update the new password in place of old password
      */
        user.updateOne({ 'email': res.decoded.payload.email }, { 'password': newPassword }, (err, data) => {
            if (err) {
                console.log("err in reset model", err);
                callback(err)
            }
            else {
                console.log("fine")
                callback(null, data);
            }
        });
    }
    catch (err) {
        /** 
       * @description:Handle the exception
       */
        console.log("error in catch")
        res.send(err);
    }
}
module.exports.isVerified = (req, res) => {
    try {
        console.log("Decoded id", req.email);
        /** 
      * @description:check email address
      */
        user.findOneAndUpdate({ email: req.email },
            { "isVerified": true },
            (err, result) => {
                if (err) {
                    console.log("token on decode email", err);
                    res(err);
                }
                else {
                    console.log("verify successfully", req.email);
                    res(null, result)
                }
            })
    }
    catch (err) {
        /** 
        * @description:Handle the exception
        */
        console.log("Error in user email verification catch block",err);
        res.send(err);
    }
}


const { Schema } = mongoose;
const urlShortenSchema = new Schema({
    originalUrl: String,
    urlCode: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const UrlShorten = mongoose.model("UrlShorten", urlShortenSchema);

const validUrl = require("valid-url");

const shortid = require("shortid");
const errorUrl = 'http://localhost/error';

module.exports.postUrl = (req, res) => {

    //console.log(req);
    const urlCode = req.query.code;
    console.log("url code", urlCode);

    UrlShorten.findOne({
        "urlCode": urlCode
    }, (err, data) => {
        if (data) {

            return res(null, data.originalUrl)
        } else {
            return res(err)
        }

    });
}

module.exports.getUrl = (req, res) => {

    const { originalUrl, shortBaseUrl } = req.body;
    console.log(originalUrl, shortBaseUrl)
    if (validUrl.isUri(shortBaseUrl)) {
        console.log("in getUrl if stmt");
        
    } else {
        return res
            .status(401)
            .json(
                "Invalid Base Url"
            );
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    if (validUrl.isUri(originalUrl)) {
        try {
            UrlShorten.findOne({ "originalUrl": originalUrl }, (err, data) => {

                if (err) {
                    return res("url already exists");
                } else {
                    var shortUrl = shortBaseUrl + "/" + urlCode;
                    console.log(shortUrl);
                    const item = new UrlShorten({
                        originalUrl,
                        shortUrl,
                        urlCode,
                        updatedAt
                    });
                    item.save();
                    return res(null, item);
                }
            });
        }
        catch (err) {
            res.status(401).json("Invalid User Id");
        }
    }
    else {
        return res
            .status(401)
            .json(
                "Invalid Original Url"
            );
    }
}
