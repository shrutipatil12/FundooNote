/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :mongooseServices.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
const mongoose = require('mongoose');

var fs = require('fs')

var jData = fs.readFileSync("/home/admin1/Desktop/shrutiB/shruti/FundooNote/server/config/configDatabase.json");
var data = JSON.parse(jData)


var db = data.development.mongourl;
class mongooseService {
    mongoose() {
        mongoose.connect(db, {
                useNewUrlParser: true
            })
            //useNewUrlParser: true
            .then(() => {
                console.log(" DB connected successfully");
            }).catch(err => {
                console.log(" DB could not connect", err);
                process.exit(0);
            })
    }
}
var ms = new mongooseService();
module.exports = ms;