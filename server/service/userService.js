
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :userService.js
 *  @author         :Shruti
 *  @version        :1.0
 ******************************************************************************/
var userModel = require('../model/userModel');
const bcrypt = require('bcrypt');

function hashing(password) {
    //hash the password using bcrypt
    var hash = bcrypt.hashSync(password, 10);
    return hash;

}
class userServices {
    constructor() { }

    userServiceRegister(data, callback) {
        try {
            userModel.create(data, (err, result) => {
                if (err) {
                    //display the error
                    console.log(err);
                    callback(err)
                }
                else {
                    //return the result 
                    return callback(null, result);
                }
            })
        }
        catch (err) {
            /** 
           * @description:Handle the exception
           */
            console.log("error in catch block register", err);
            callback(err);
        }
    }


    userServiceLogin(data, callback) {
        try {
            console.log("service 35");

            userModel.get(data, (err, result) => {
                if (err) {
                    //display the error
                    console.log(err);
                    callback(err);
                }
                else {
                    //return the result
                    console.log("45 ser", result);

                    callback(null, result);
                }
            })
        }
        catch (err) {
            /** 
             * @description:Handle the exception
            */
            console.log("error in catch block login", err);
            callback(err);
        }
    }



    userServicesForgetPassword(data, callback) {
        try {
            userModel.getForget(data, (err, result) => {
                if (err) {

                    //display the error 
                    console.log(err);
                    callback(err)
                }
                else {

                    //return the result of the function
                    callback(null, result);
                }
            })
        }
        catch (err) {
            /** 
    * @description:Handle the exception
    */
            console.log("error in catch block forgetPassword", err);
            callback(err);
        }

    }


    userServicesResetPassword(data, callback) {
        try {
            console.log("reset services");
            let newPassword = hashing(data.password)

            var resetField ={$set: {
                password:newPassword
            }}
            console.log("new pswd", newPassword);
            //console.log(JSON.stringify(data.decoded))
            userModel.update(data, resetField, (err, result) => {
                console.log("resetField", resetField);

                if (err) {
                    //throw an error
                    console.log("service error");
                    callback(err);
                } else {
                    //display the result
                    console.log("In service", result);
                    callback(null, result);
                }
            })
        } catch (err) {
            /** 
            * @description:Handle the exception
            */
            console.log("error in catch block reset", err);
            callback(err);
        }
    }

    userServicesIsVerify(data, callback) {
        try {
            console.log("data in service verify", data);

            var emailData = {
                //email: data.decoded.payload.email,
                email: data.email,

                isVerified: true
            }
            console.log("in V ", emailData)
            userModel.update(data, emailData, (err, result) => {
                if (err) {
                    //Send the error message
                    console.log("services error");
                    callback(err);
                }
                else {
                    //Send the result
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /** 
            * @description:Handle the exception
            */

            console.log(" error in services catch verify", err);
            callback(err);
        }
    }


}
var service = new userServices();
module.exports = service;
