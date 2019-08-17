/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :userController.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var userService = require('../service/userService');
var middleEmail = require('../middleWare/sendM');
var jwt = require('jsonwebtoken');
var middleToken = require('../middleWare/token')
var redis = require('redis');
var client = redis.createClient();

module.exports.register = (req, res) => {
  try {
    console.log("in register controller")
    var response = {};

    var registerData = {
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
      lastname: req.body.lastname
    }
    //validate the user first name 
    req.checkBody("firstname", "First name is not valid").isAlpha();
    req.checkBody("lastname", "last name is not valid").isAlpha();

    //validate user email Id
    req.checkBody("email", "email is not valid").isEmail();
    //validate user entered password
    req.checkBody("password", "password is not valid").isLength({
      min: 3
    });

    userService.userServiceRegister(registerData, (err, result) => {

      if (err) {
        //send status as false to show error
        response.success = false;
        //Send response as error
        response.err = err;
        //Send status code as 400 for Bad Request response status code
        res.status(400).send(response);
      } else {
        //send status as true for successful result
        response.success = true;
        //Send the response as result 
        response.result = result;

        console.log("result in register ", req.body)
        console.log("result 112", result)
        console.log("id", result._id);

        const payload = {
          _id: result._id,
          email: result.email
        }
        console.log("payload id", payload._id)
        console.log("payload", payload)
        /** 
         * @description:call the function to create a token
         */
        //call the function and generate the new token
        const resObj = middleToken.generateNewToken(payload);
        console.log("Obj", resObj);

        const url = process.env.url + resObj.token
        console.log("url in ctrl", url)

        //set the redis client to verify the token
        client.set(result._id.toString(), resObj.token, function (error, result) {
          if (error) {
            //report the error if any occure
            console.log("error in redis set client", error);
          } else {
            //Display the result
            console.log("token verified", result);
          }
        })

        /** 
         * @description:call sendMail function
         */
        //Call the send mail function 
        middleEmail.mail(url, req.body.email);
        response.url = url
        //Send the status code as 200 for OK The request was fulfilled.
        res.status(200).send(response);
      }

    })
  } catch (err) {
    /** 
     * @description:Handle the exception
     */
    //req.send(err);
    console.log("Error in  catch ", err);

  }
}



module.exports.login = (req, res) => {
  try {
    //console.log("login data",req.body);
    var loginData = {
      email: req.body.email,
      password: req.body.password
    }
    var response = {};
    userService.userServiceLogin(loginData, (err, data) => {
      //console.log("ctrl 38", req.body);

      if (err) {
        console.log(err)
        console.log("ctrl 41");
        //return error if any error occure
        //return res.status(500).send({ message: err })

        response.success = false;
        response.message = "error"
        response.err = err;
        res.status(400).send(response);
      } else {
        response.success = true;
        response.message = "login data"
        console.log("data in ctrl login", data._id);

        const payload = {
          _id: data._id,

        }
        console.log("payload id", payload._id)
        console.log("payload", payload)
        /** 
         * @description:call the function to create a token
         */
        //call the function and generate the new token
        const resObj = middleToken.generateNewToken(payload);
        console.log("Obj", resObj);

        const loginToken = resObj.token
        console.log("loginToken in ctrl", loginToken)

        //set the redis client to verify the token
        client.set((payload._id), resObj.token, function (error, result) {
          if (error) {
            //report the error if any occure
            console.log("error in redis set client", error);
          } else {
            //Display the result
            console.log("token verified...", result);
          }

        })
        var userData = {
          token: loginToken,
          _id: payload._id
        }
        response.data = userData
        //return the result

        res.status(200).send(response);

        //return the result message data as result
        // message: data,



      }
    })

  } catch (err) {

    /** 
     * @description:Handle the exception
     */
    console.log("ctrl 61");
    res.send(err);
  }

}




module.exports.forgetPassword = (req, res) => {

  try {
    req.checkBody("email", "email is not valid").isEmail();
    //console.log("ctrl data forget",req.body);
    var forgetData = {
      email: req.body.email
    }
    userService.userServicesForgetPassword(forgetData, (err, result) => {
      //validate user email Id
      var response = {};
      console.log("forget paswd")
      if (err) {
        //send success response as false to show error
        response.success = false;
        response.message = "error"
        //Send the response error
        response.err = err;
        //Send status code as 400 for Bad Request response status code
        res.status(400).send(response);

      } else {
        //send status as true for successful result
        response.success = true;
        response.message = "forget password data"
        //Send the response as result of the function
        response.data = result;
        console.log("result in forgot pswd ", response)
        const payload = {
          email: result.email
        }
        console.log("email payload", payload.email)
        console.log("payload", payload)

        //call the function to create a token
        const resObj = middleToken.generateNewToken(payload);
        console.log("Obj", resObj);

        const url = process.env.urlFroget + resObj.token
        console.log("url", url)

        //call sendMail function
        middleEmail.mail(url, req.body.email);
        //Send the status code as 200 for OK The request was fulfilled.

        res.status(200).send({
          resetUrl: url,
          //data: result
        })
      }
    })
  } catch (err) {
    /** 
     * @description:Handle the exception
     */
    console.log("error in catch controller", err);
    req.send(err);
  }
}


module.exports.reset = (req, res) => {
  try {
    console.log("data in reset ctrl", req.decoded.payload.email);
    var resetData = {
      email: req.decoded.payload.email,
      password: req.body.password
    }
    var responseResult = {};
    //validate user entered password
    req.checkBody("password", "password is not valid").isLength({
      min: 3
    });

    console.log('ctrl reset');
    userService.userServicesResetPassword(resetData, (err, result) => {
      if (err) {
        //send status as false to show error
        console.log("ctrl if reset ")
        responseResult.success = false;
        responseResult.message = "error"
        //Send the response as error
        responseResult.error = err;
        //Send status code as 400 for Bad Request response status code
        res.status(400).send(responseResult)
      } else {
        //send status as true for successful result
        console.log('in user ctrl else', result);
        responseResult.success = true;
        responseResult.message = "reset password data"
        //Send the response as result of the function
        responseResult.data = result;
        //Send the status code as 200 for OK The request was fulfilled.=
        res.status(200).send(responseResult);
      }
    })
  } catch (err) {
    /** 
     * @description:Handle the exception
     */
    req.send(err);
  }
}
module.exports.isVerified = (req, res) => {
  try {
    console.log("is verify data", req.body)
    var isVerifyData = {
      _id: req.body._id,
      email: req.body.email
    }
    var responseResult = {};
    userService.userServicesIsVerify(isVerifyData, (err, result) => {
      if (err) {
        //send status as false to show error
        responseResult.success = false,
          responseResult.message = "error"
        //Send status code as 400 for Bad Request response status code

        res.status(400).send(err)
      } else {
        //send status as true for successful result
        responseResult.success = true,
          responseResult.message = "isVerify data"
        responseResult.data = result,
          //Send the status code as 200 for OK The request was fulfilled.=

          res.status(200).send(responseResult)
      }
    })
  } catch (error) {
    /** 
     * @description:Handle the exception
     */
    console.log("Error in ctrl catch isVerify", error);
    req.send(error);
  }
}


module.exports.uploadPhoto = (req, res) => {
  try {
    var responseResult = {};
    //get the file location
    var image = req.file.Location
    //send the success result as image
    responseResult.success = true;
    responseResult.message = "upload photo successfully"
    //Send the response as success result as functions output as a image

    responseResult.result = image;
    //Send the status code as 200 for OK The request was fulfilled.

    res.status(200).send(responseResult);
  } catch (err) {
    /** 
     * @description:Handle the exception
     */
    console.log("uploadPhoto catch ctrl", err)
    //req.send(err);
  }
}