
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :shortUrlController.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var shortUrlService=require('../service/shortUrlService')
module.exports.getUrl = (req, res) => {
    try {

      var responseResult = {};
      console.log('ctrl getUrl',req.body);
      var getUrlData={
        originalUrl: req.body.originalUrl,
        shortBaseUrl: req.body.shortBaseUrl
      }
      shortUrlService.shortGetUrl(getUrlData, (err, result) => {
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
        console.log('ctrl postUrl',req.body);
      var responseResult = {};
      
      shortUrlService.shortPostUrl(req, (err, result) => {
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
  
  