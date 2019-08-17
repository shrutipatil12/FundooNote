
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :shortUrlServices.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var shortUrlModel=require('../model/shortUrlModel')
class shortUrl{
    constructor() { } 


shortPostUrl  (data, callback)  {
    try {
        console.log("postUrl services")
        shortUrlModel.shortUrlPostUrl(data, (err, result) => {
            if (err) {
                //throw an error
                console.log("service error");
                callback(err);
            } else {
                //display the result
                // console.log("In service", result);
                callback(null, result);
            }
        })
    } catch (err) {
        /** 
* @description:Handle the exception
*/
        console.log("error in catch block postUrl", err);

        callback(err);
    }
}


shortGetUrl(data, callback)  {
    try {

        shortUrlModel.shortUrlGetUrl(data, (err, result) => {
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
        console.log("error in catch block getUrl", err);

        callback(err);
    }
}

}


var shortUrlObject=new shortUrl();
module.exports=shortUrlObject;