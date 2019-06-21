
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

        return res.status(500).send({ message: err })
      }
      else {
       // console.log("res in controller: ", res);
        return res.status(200).send({
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

    req.checkBody("firstname", "First name is not valid").isAlpha();
    req.checkBody("email", "email is not valid").isEmail();
    req.checkBody("password", "password is not valid").isLength({ min: 3 });
    var err = req.validationErrors();
    userService.register(req.body, (err, result) => {

      if (err) {
        //send status as false to show error
        response.success = false;
        response.err = err;
        res.status(400).send(response);
      }
      else {
        //send status as true for successful result
        response.success = true;
        response.result = result;
        //res.status(200).send(response);
        console.log("result in register ", req.body)
        console.log("result 112", result)
        const payload = {
          _id:result._id
        }
        console.log("payload id", payload._id)
        console.log("payload", payload)
        /** 
        * @description:call the function to create a token
        */

        
        const resObj = middleToken.generateNewToken(payload);
        console.log("Obj", resObj);

        const url =process.env.url+resObj.token
        console.log("url fdsfsdf", url)

        client.set(result._id,resObj.token,function(error,result){
          if(error)
          {
            console.log("error in redis set client",error);
          }
          else
          {
            console.log("token verified",result);
          }
        })
  
  
        /** 
      * @description:call sendMail function
      */
        middleEmail.mail(url, req.body.email);
        
        res.status(200).send(url);
      }

    })
  }
  catch (err) {
    /** 
    * @description:Handle the exception
    */
    req.send(err);
  }
}


module.exports.forgetPassword = (req, res) => {
 
  try {
    userService.forgetPassword(req, (err, result) => {


      var response = {};
      console.log("forget paswd")
      if (err) {
        //send status as false to show error
        response.success = false;
        response.err = err;
        res.status(400).send(response);

      }
      else {
        //send status as true for successful result
        response.success = true;
        response.result = result;
        console.log("result in forgot pswd ", response)
        const payload = {
         
          email:req.body.email
        }
        console.log("email payload", payload.email)
        console.log("payload", payload)

        //call the function to create a token
        const resObj = middleToken.generateNewToken(payload);
        console.log("Obj", resObj);
        //url for reset password with the generated token
        const url = process.env.urlFroget+resObj
        console.log("url", url)

        //call sendMail function
        middleEmail.mail(url, req.body.email);
        res.status(200).send(url);
      }

    })
  }
  catch (err) {
    /** 
* @description:Handle the exception
*/
console.log("error in catch controller",err);
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
        responseResult.error = err;
        res.status(400).send(responseResult)
      }
      else {
        //send status as true for successful result
        console.log('in user ctrl else');
        responseResult.success = true;
        responseResult.result = result;
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
        responseResult.success = false,
          res.status(400).send(err)
      }
      else {
        responseResult.success = true,
          responseResult.result = true,
          res.status(200).send(responseResult)
      }
    })
  }
  catch (error) {
    /** 
* @description:Handle the exception
*/

    console.log("Error in ctrl catch");
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
        res.status(400).send(responseResult)
      }
      else {
        //send status as true for successful result
       
        responseResult.success = true;
        responseResult.result = result;
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


module.exports.postUrl = (req, res) => {
  try {
    var responseResult = {};
    console.log('ctrl postUrl');
    userService.postUrl(req, (err, result) => {
      if (err) {
        //send status as false to show error
        console.log("ctrl if postUrl ")
        responseResult.success = false;
        responseResult.error = err;
        res.status(400).send(responseResult)
      }
      else {
        //send status as true for successful result
       
        responseResult.success = true;
        responseResult.result = result;
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


module.exports.uploadPhoto = (req, res) => {
  try {
    var responseResult = {};
    var image=req.file.Location
   
    //uploadPhoto(req.body, (err, result) => {
      // if (err) {
      //   //send status as false to show error
      //   console.log("ctrl if uploadPhoto ")
      //   responseResult.success = false;
      //   responseResult.error = err;
      //   res.status(400).send(responseResult)
      // }
      // else {
        //send status as true for successful result
       
        responseResult.success = true;
        responseResult.result = image;
        res.status(200).send(responseResult);
      }
    // })
 // }
    
  
  catch (err) {
    /** 
* @description:Handle the exception
*/console.log("uploadPhoto catch ctrl",err)
 //req.send(err);
  }
}

