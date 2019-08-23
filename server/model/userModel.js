
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :userModel.js
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
        validator: 'isLength',//Check for the length
        arguments: [3, 30],//length of the first name should be greater than 3 and less than 30
        message: "name should be in correct format",//Display the error message to user
        httpStatus: 400//Send the status
    })
]
var emailValidator = [
    validate({
        validator: "isEmail",//Validate the user Email ID
        message: "email should be in correct format",//Display the error message
        httpStatus: 400//Send the status
    })
]
/**
 * @description:Create schema
 */

var mongooseSchema = mongoose.Schema;
var userData = mongooseSchema({
    "firstname": {
        type: String,//Type should be string
        validate: firstnameValidator,
        required: [true, "firstname is require"]//mandetory field
    },
    
    "email": {
        type: String,//Type should be string
        validate: emailValidator,
        required: [true, "email is require"]//mandetory field
    },
    "password": {
        type: String,//Type should be string
        required: [true, "password is require"]//mandetory field
    },
    "lastname": {
        type: String,//Type should be string
       // validate: firstnameValidator,
        required: [true, "firstname is require"]//mandetory field
    },
    "isVerified": {
        type: Boolean,//Type should be Boolen
        default: false//Default value set to false
    }
});


var user = mongoose.model('user', userData);
/**
 * @description: adding encryption to password
 * @param {*} password 
 */
function hashing(password) {
    //hash the password using bcrypt
    var hash = bcrypt.hashSync(password, 10);
    return hash;

}
class modelFunctions {
    constructor() { }


async create (reqData, callback) {
    try {
       
       let result=await user.find({ 'email': reqData.email })
            console.log("89 rm", reqData.email,reqData.password,result);

            if (result==null) {
                //console.log(err);
                return callback("error in creating the user")

            }
            // else if (result != null) {
            //     // console.log("sss", err)
            //     console.log('Email id exist');
            //     //return callback('Email id already exist')

            // } 
            else {
                /**
                 * @description: if email address is not present save the registered user details
                */
               var Password = hashing(reqData.password)
               reqData.password=Password;
               
                console.log("register firstnm 69", reqData.firstname)
                const newUser = new user(
                    
                    {
                        "firstname": reqData.firstname,
                        "email": reqData.email,
                        "password": reqData.password,
                        "lastname":reqData.lastname
                    })
                console.log("register firstnm", reqData.firstname)
                newUser.save(function (err, data) {
                    if (err) {
                        //return the error
                        return callback(err);
                    } else {
                        //return the result data
                        console.log('inside saved');
                        console.log("84 rm")
                        callback(null, data);
                    }
                });

            }
        

    }
    catch (err) {
        /** 
        * @description:Handle the exception
        */
        console.log("error in catch register", err);

       callback(err);
    }
}


async get(data, callback) {
    try {
       console.log("model 106", data.email);
       console.log("model 106 password", data.password);
       let result=await user.findOne({ 'email': data.email })
            // if (result==null) {
            //     //console.log(err);
            //     return callback("error in login ")
            // }
             if (result != null) {
                console.log("result after finding data: ", result);
                console.log("1"  ,data.password);
                console.log("2"  ,result.password);

                bcrypt.compare(data.password, result.password, function(err, res) {
                    console.log("result  ", res)
                    if (err) {
                        console.log("error in model: ", err);   
                        callback(err)
                    }
                    else if(res)
                    {
                        console.log("Login Successfull",result);
                        callback(null,result);
                        
                    }
                    else {
                        /** 
                         * @description:show result if data is correct
                        */
                        console.log("Login invalid",result);
                        callback("Invalid data");
                    }

                })
            //}
           // else {
                /** 
                 * @description:else print the error message
                 */

                // console.log("Enter correct data")
                // callback(err);
            }
    }
    catch (err) {
        /** 
        * @description:Handle the exception
        */
        console.log("error in catch login", err);

        res.send(err);
    }
}



async getForget(res, callback)  {
    try {
        /** 
       * @description:check the email address
       */
      let result=await user.findOne({ "email": res.email })
      console.log("email in model",res.email,result);
      
            if (result==null) {
                console.log(err);
                callback("enter correct data")
            }
            else if (result){
                /** 
       * @description:check the registered email address with the email address entered while forget password
       */

                // if (result !== null ) 
                // {
                    callback(null,result)

                }
                // else {
                //     callback("incorrect Email");
                // }

           // }
           else
           {
            console.log("invalid email ");
           }
    }
    
    catch (err) {
        /** 
        * @description:Handle the exception
        */
        console.log("error in catch forgetPassword", err);

        callback(err);
    }
}

update(res, updateField, callback) {
    try {
    
        /** 
      * @description: update the new password in place of old password
      */
        user.updateOne({ email: res.email },updateField, (err, data) => {
           console.log("resetFieldmodel",updateField);
           
            if (err) {
                console.log("err in reset model", err);
                callback(err)
            }
            else {
                console.log("fine",data)
                callback(null, data);
            }
        });
    }
    catch (err) {
        /** 
       * @description:Handle the exception
       */
        console.log("error in catch",err)
        //res.send(err);
    }
}


// 


// async update (data,updateField, callback) {
//     try {
//         console.log("update data in model", data,"kdshfss",updateField);
//         /** 
//       * @description:check email address
//       */
//       let result=await user.findOneAndUpdate({ _id: data._id },updateField)
//                 if (result==null) {
//                     console.log("token on decode email", err);
//                     callback("error in update api");
//                 }
//                 else if (result)
//                 {
//                     console.log("verify successfully", result);
//                     callback("update field successfully executed",result)
//                 }
//                 else
//                 {
//                     console.log("error in reset ");
                    
//                 }
            
//     }
//     catch (err) {
//         /** 
//         * @description:Handle the exception
//         */
//         console.log("Error in user email verification catch block", err);
//         callback(err);
//     }
// }

}

var modelObject=new modelFunctions
module.exports=modelObject;
