
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :server.js
 *  @author         :Shruti
 *  @version        :1.0
 ******************************************************************************/
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('../server/config/databaseconfig')
var routes = require('../server/router/route')
var chatController = require('../server/controller/regController')
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
require('http').createServer(app);

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }))
/** 
* @description: Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(bodyParser.json());
var expressValidator = require('express-validator')
app.use(expressValidator());
/** 
* @description:For front end connectivity
*/
app.use(express.static('../client'));
/**
 *  @description: connect to the database
*/

app.use('/', routes)

var server = app.listen(3000, () => {
    console.log("Server is listening to port 3000");
})

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log("socket is connected successfully");
    /**
     * @description: started listening events  and socket.on wait for the event.whenever that event is triggered to callback
     */
    socket.on('createMessage', function (message) {
        chatController.addMessage(message, (err, data) => {
            console.log('msg from server', message)
            if (err) {
                console.log("Error in message", err);

            }
            else {
                console.log(message, "in server");
                io.emit('newMessageSingle', message);
            }
        })
        socket.on('disconnect', function () {
            console.log("Socket disconnected");

        });
    });

});

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log(" DB connected sucessfully");
}).catch(err => {
    console.log(" DB could not connect", err);
    process.exit(0);
})

module.exports = app;
