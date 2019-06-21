//var jwt = require('jsonwebtoken');
var redis = require('redis');
var secret = "secretkey";
exports.checkRedisToken = (req, res, next) => {
  

    var jwt = require('jsonwebtoken');
var client = redis.createClient();

    client.get(req.body._id, function (error, result) {
        jwt.verify(result,secret,function(err,resVerify){
        if (err) {
            console.log("got error in get client",error);
          return res.status(401).send(err);
        }
        else
        {
        console.log('result in get client' + resVerify);
        
         res.status(200).send("verified Successfully");
         next();

        }
    });
    });
  }


