
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :regService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var userModel = require('../model/regModel');
//var userMiddle=require('../middleWare/uploadProfile')

module.exports.register = (data, callback) => {
    try {
        userModel.register(data, (err, result) => {
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
        callback(err);
    }
}


module.exports.login = (data, callback) => {
    try {
        console.log("service 35");

        userModel.login(data, (err, result) => {
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
    
        console.log("service 51");
        callback(err);
    }
}



module.exports.forgetPassword = (data, callback) => {
    try {
        userModel.forgetPassword(data, (err, result) => {
            if (err) {

                //display the error 
                console.log(err);
                callback(err)
            }
            else {

                //return the result of the function
                return callback(null, result);
            }
        })
    }
    catch (err) {
         /** 
* @description:Handle the exception
*/
        callback(err);
    }

}


module.exports.reset = (data, callback) => {
    try {
        console.log("reset services")
        userModel.reset(data, (err, result) => {
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
    
        callback(err);
    }
}


module.exports.isVerified = (req, callback) => {
    try {
        var data = {
            email: req.decoded.payload.email
        }
        userModel.isVerified(data, (err, result) => {
            if (err) {
                console.log("services error");
                callback(err);
            }
            else {
                callback(null, result)
            }
        })
    }
    catch (err) {
          /** 
* @description:Handle the exception
*/
    
        console.log(" error in services catch", err);
        callback(err);
    }
}



module.exports.getUrl = (data, callback) => {
    try {
       
        userModel.getUrl(data, (err, result) => {
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
    
        callback(err);
    }
}




module.exports.postUrl = (data, callback) => {
    try {
        console.log("postUrl services")
        userModel.postUrl(data, (err, result) => {
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
    
        callback(err);
    }
}





// module.exports.uploadPhoto = (data, callback) => {
//     try {
//         //console.log("uploadPhoto services",data)
//         userMiddle.uploadPhoto(data, (err, result) => {
//             if (err) {
//                 //throw an error
//                 console.log("service error");
//                 callback(err);
//             } else {
//                 //display the result
//                 console.log("In service", result);
//                 callback(null, result);
//             }
//         })
//     } catch (err) {
//          /** 
// * @description:Handle the exception
// */
//     //console.log("uploadPhoto catch service",err)
//         callback(err);
//     }
// }


