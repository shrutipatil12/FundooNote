
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :shortUrlModel.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
const validUrl = require("valid-url");

const shortid = require("shortid");

const mongoose = require('mongoose');

const { Schema } = mongoose;
const urlShortenSchema = new Schema({
    originalUrl: String,
    urlCode: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const UrlShorten = mongoose.model("UrlShorten", urlShortenSchema);

class shortUrlClass{
    constructor(){ }


shortUrlPostUrl (result, res)  {

    //console.log(req);
    const urlCode = result.query.code;
    console.log("url code", urlCode);

    UrlShorten.findOne({
        "urlCode": urlCode
    }, (err, data) => {
        if (data) {
            //return the result
            return res(null, data.originalUrl)
        } else {
            //return the error
            return res(err)
        }

    });
}

shortUrlGetUrl (result, res)  {

    const { originalUrl, shortBaseUrl } = result;
    console.log(originalUrl, shortBaseUrl)
    //check whether the shortBaseUrl is valid or not
    if (validUrl.isUri(shortBaseUrl)) {

        console.log("in getUrl if stmt");

    } else {
        //return the result
        return res
            .status(401)
            .json(
                "Invalid Base Url"
            );
    }
    const urlCode = shortid.generate();
    const updatedAt = new Date();
    //check whether the originalUrl is valid or not

    if (validUrl.isUri(originalUrl)) {
        try {
            UrlShorten.findOne({ "originalUrl": originalUrl }, (err, data) => {

                if (err) {
                    return res("url already exists");
                } else {
                    var shortUrl = shortBaseUrl + "/" + urlCode;
                    console.log(shortUrl);
                    const item = new UrlShorten({
                        originalUrl,
                        shortUrl,
                        urlCode,
                        updatedAt
                    });
                    //Save to database
                    item.save();
                    return res(null, item);
                }
            });
        }
        catch (err) {
            //handle the exception
            res.status(401).json("Invalid User Id");
        }
    }
    else {
        return res
            .status(401)
            .json(
                "Invalid Original Url"
            );
    }
}

}
var urlClassObject=new shortUrlClass();
module.exports=urlClassObject;