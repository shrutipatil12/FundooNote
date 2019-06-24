
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :regController.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var userService = require('../service/regService');
var middleEmail = require('../middleWare/sendM');
var jwt = require('jsonwebtoken');
var middleToken = require('../middleWare/token')
var redis = require('redis');
var client = redis.createClient();

module.exports.login = (req, res) => {
  try {
    console.log("ctrl 17");
    userService.login(req.body, (err, data) => {
      console.log("ctrl 38", req.body);

      if (err) {
        console.log(err)
        console.log("ctrl 41");
        //return error if any error occure
        return res.status(500).send({ message: err })
      }
      else {

        //return the result
        return res.status(200).send({
          //return the result message data as result
          message: data,

        });


      }
    })

  }
  catch (err) {

    /** 
    * @description:Handle the exception
    */
    console.log("ctrl 61");
    res.send(err);
  }

}




module.exports.register = (req, res) => {
  try {
    //console.log("in register controller",req)
    var response = {};
    //validate the user first name 
    req.checkBody("firstname", "First name is not valid").isAlpha();
    //validate user email Id
    req.checkBody("email", "email is not valid").isEmail();
    //validate user entered password
    req.checkBody("password", "password is not valid").isLength({ min: 3 });

    userService.register(req.body, (err, result) => {

      if (err) {
        //send status as false to show error
        response.success = false;
        //Send response as error
        response.err = err;
        //Send status code as 400 for Bad Request response status code
        res.status(400).send(response);
      }
      else {
        //send status as true for successful result
        response.success = true;
        //Send the response as result 
        response.result = result;

        console.log("result in register ", req.body)
        console.log("result 112",result)
        console.log("id",result._id);
        
        const payload = {
          _id:result._id
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
        console.log("url fdsfsdf", url)

        //set the redis client to verify the token
        client.set(result._id, resObj.token, function (error, result) {
          if (error) {
            //report the error if any occure
            console.log("error in redis set client", error);
          }
          else {
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
  }
  catch (err) {
    /** 
    * @description:Handle the exception
    */
    req.send(err);
    console.log("Error in  catch ", err);

  }
}


module.exports.forgetPassword = (req, res) => {

  try {
    userService.forgetPassword(req, (err, result) => {


      var response = {};
      console.log("forget paswd")
      if (err) {
        //send success response as false to show error
        response.success = false;
        //Send the response error
        response.err = err;
        //Send status code as 400 for Bad Request response status code
        res.status(400).send(response);

      }
      else {
        //send status as true for successful result
        response.success = true;
        //Send the response as result of the function
        response.result = result;
        console.log("result in forgot pswd ", response)
        const payload = {

          email: req.body.email
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

        res.status(200).send(url);
      }

    })
  }
  catch (err) {
    /** 
* @description:Handle the exception
*/
    console.log("error in catch controller", err);
    req.send(err);
  }
}


module.exports.reset = (req, res) => {
  try {
    var responseResult = {};
    console.log('ctrl reset');
    userService.reset(req, (err, result) => {
      if (err) {
        //send status as false to show error
        console.log("ctrl if reset ")
        responseResult.success = false;
        //Send the response as error
        responseResult.error = err;
        //Send status code as 400 for Bad Request response status code
        res.status(400).send(responseResult)
      }
      else {
        //send status as true for successful result
        console.log('in user ctrl else');
        responseResult.success = true;
        //Send the response as result of the function
        responseResult.result = result;
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
    //console.log(req)
    var responseResult = {};
    userService.isVerified(req, (err, result) => {
      if (err) {
        //send status as false to show error
        responseResult.success = false,
          //Send status code as 400 for Bad Request response status code

          res.status(400).send(err)
      }
      else {
        //send status as true for successful result
        responseResult.success = true,
          responseResult.result = result,
          //Send the status code as 200 for OK The request was fulfilled.=

          res.status(200).send(responseResult)
      }
    })
  }
  catch (error) {
    /** 
* @description:Handle the exception
*/
    console.log("Error in ctrl catch isVerify");
    req.send(err);
  }
}


module.exports.getUrl = (req, res) => {
  try {
    var responseResult = {};
    console.log('ctrl getUrl');
    userService.getUrl(req, (err, result) => {
      if (err) {
        //send status as false to show error
        console.log("ctrl if getUrl ")
        responseResult.success = false;
        responseResult.error = err;
        //Send status code as 400 for Bad Request response status code

        res.status(400).send(responseResult)
      }
      else {
        //send status as true for successful result
        responseResult.success = true;
        //Send the response as success result as functions output
        responseResult.result = result;
        //Send the status code as 200 for OK The request was fulfilled.=

        res.status(200).send(responseResult);
      }
    })
  } catch (err) {
    /** 
* @description:Handle the exception
*/
    console.log("error in catch getUrl", err);

    req.send(err);
  }
}


module.exports.postUrl = (req, res) => {
  try {
    var responseResult = {};
    console.log('ctrl postUrl');
    userService.postUrl(req, (err, result) => {
      if (err) {
        //send status as false to show error
        console.log("ctrl if postUrl ")
        responseResult.success = false;
        //Send the error as response for false success
        responseResult.error = err;
        //Send status code as 400 for Bad Request response status code

        res.status(400).send(responseResult)
      }
      else {
        //send status as true for successful result

        responseResult.success = true;
        //Send the result variable as successful result
        responseResult.result = result;
        //Send the status code as 200 for OK The request was fulfilled.

        res.status(200).send(responseResult);
      }
    })
  } catch (err) {
    /** 
* @description:Handle the exception
*/
    console.log("error in catch postUrl", err);

    req.send(err);
  }
}


module.exports.uploadPhoto = (req, res) => {
  try {
    var responseResult = {};
    //get the file location
    var image = req.file.Location
    //send the success result as image
    responseResult.success = true;
    //Send the response as success result as functions output as a image

    responseResult.result = image;
    //Send the status code as 200 for OK The request was fulfilled.

    res.status(200).send(responseResult);
  }

  catch (err) {
    /** 
* @description:Handle the exception
*/console.log("uploadPhoto catch ctrl", err)
    //req.send(err);
  }
}

