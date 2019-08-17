/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :redisToken.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var redis = require('redis');
//var secret = process.env.secret;
var secret = 'secretKey';
exports.checkRedisToken = (req, res, next) => {


  var jwt = require('jsonwebtoken');
  var client = redis.createClient();//Create the new redis client 
  console.log("in get client 8", req.headers['_id']);

  client.get(req.headers['_id'], function (error, result) {
    if (error) {
      console.log("error in get client", error);

    }
    jwt.verify(result, secret, function (err, resVerify) {
      try {
        if (err) {
          //Send the status as 401 as Unauthorized client 
          console.log("got error in get client", err);
          return res.status(401).send(err);
        }
        else {
          //Send the status as 200 for successful result

          req.decoded = resVerify;
          next();

        }
      }
      catch (err) {
        console.log("error in redis catch", err);
      }
    });
  });
}


