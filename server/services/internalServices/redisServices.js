
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :redisServices.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var redis = require('redis');
var client = redis.createClient();

class redisEventsClass{
redisEvent(){
    client.on('connect', function () {
    console.log('Redis client connected');
});
}
}
var eventObject=new redisEventsClass();
module.exports=eventObject;
