/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :tokenVerify.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var jwt = require('jsonwebtoken');
//var redis = require('redis');
var secret = 'secretKey';

exports.checkToken = (req, res, next) => {
    try {
        console.log("In authentication", req.headers);
       var token = req.headers['token']||req.params.token
        console.log("token in t verify", token);

        var Response = { message: "invalid data" }
        if (token) {
            //verify the token here
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    // throw if unauthorized error occurs
                    console.log(err)
                    console.log("Response", Response);

                    return res.status(401).send({ Response });

                }
                else {
                    //show result
                    console.log("Decoded data" + JSON.stringify(decoded));
                    req.decoded = decoded;
                    console.log("27 ", req.decoded)
                    next();
                }

            });
        }
        else {
            return res.send({
                success: false,
                message: "token not provide"
            })
        }
    }



    catch (err) {
        //throw exception
        console.log(" error while generating the token", err);

    }
}

// exports.checkRedisToken = (req, res, next) => {


//         var jwt = require('jsonwebtoken');
// //var client = redis.createClient();

//         client.get(req.body._id, function (error, result) {
//         jwt.verify(result,secret,function(err,resVerify){
//             if (err) {
//                 console.log("got error in get client",error);
//               return res.status(401).send(err);
//             }
//             else
//             {
//             console.log('result in get client' + resVerify);
//              res.status(200).send('working fine')
//             next();

//             }
//         });
//         });
//       }

    //}
