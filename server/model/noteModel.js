

/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :noteModel.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
const mongoose = require('mongoose');
var mongooseSchema = mongoose.Schema;
var validate = require('mongoose-validator');

/**
* @description    : moongoose validations used for give validations for schema 
*/


var descriptionValidation = [
    validate({
        validator: 'isLength',//Check for the length
        arguments: [3, 60],//length of the description name should be greater than 3 and less than 30
        message: "description should be in correct format",//Display the error message to user
        httpStatus: 400//Send the status
    })
]
var titleValidation = [
    validate({
        validator: 'isLength',//Check for the length
        arguments: [3, 30],//length of the title name should be greater than 3 and less than 30
        message: "title should be in correct format",//Display the error message to user
        httpStatus: 400//Send the status
    })
]
var colorValidation = [
    validate({
        validator: 'isLength',//Check for the length
        arguments: [3, 10],//length of the first name should be greater than 3 and less than 10
        message: "color should be in correct format",//Display the error message to user
        httpStatus: 400//Send the status
    })
]

var labelValidation = [
    validate({
        validator: 'isLength',//Check for the length
        arguments: [3, 10],//length of the first label should be greater than 3 and less than 10
        message: "label should be in correct format",//Display the error message to user
        httpStatus: 400//Send the status
    })
]
var noteData = mongooseSchema({

    "userId": {

        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is require"],//mandetory field
      
    },
    "description": {
        type: String,/** @description Type should be string */
        required: [true, "description is require"],//mandetory field
        validate: descriptionValidation
    },
    "title": {
        type: String,/** @description Type should be string */
        required: [true, "title is require"],//mandetory field
        validate: titleValidation

    },
    "color": {
        type: String,/** @description Type should be string */
        // required: [true, "colorNote is require"],//mandetory field
        validate: colorValidation

    },

    "label": [{
        type: String,/** @description Type should be string */
         validate: labelValidation

    }],
    "trash":
    {
        type: String,/** @description Type should be boolean */
        //required: [true, "value require"],
        default: false
    },
    "archives":
    {
        type: String,/** @description Type should be String */
        default: false
    },
    "reminder": {
        type: String,/** @description Type should be String */

    },
    "image": {
        type: String/** @description Type should be String */
    }
});
var noteDatabase = mongoose.model('noteDatabase', noteData);
class noteModel {
    constructor() { }
    async createNote(req, callback) {
        try {
            console.log(" userId 69", req.userId)
            /** @description Create the  new note */
            const newUser = new noteDatabase(
                {
                    "userId": req.userId,
                    "description": req.description,
                    "title": req.title,
                    "color": req.color,
                    "label": req.label,
                    "trash": req.trash,
                    "archives": req.archives,
                    "reminder": req.reminder,
                    "image": req.image

                })

            let result = await newUser.save()
            callback(null, result);
        }

        //}
        catch (err) {
            /** 
            * @description:Handle the exception
            */
            console.log("error in catch createNote", err);

            callback(err);
        }
    }

    async update(data, updateData, callback) {
        console.log("id in model update", updateData);
        try {
            /** @description As per the user input update the fields */
            let result = await noteDatabase.findOneAndUpdate({ _id: data._id }, updateData,
                {
                    $set: {
                        reminder: data.reminder,
                        trash: data.trash,
                        archives: data.archives
                    }
                })

            //(err, result) => {
            if (result == null) {
                /** @description return the error */
                //console.log("error in model note", err);
                callback("error while update");
            }
            else {
                /** @description return the result data */
                console.log("update note successfully", result);
                callback(null, result)
            }
            //  })
        }
        catch (err) {
            /** @description:Handle the exception */
            console.log("Error in update catch block", err);
            callback(err);
        }
    }



    async searchNote(data, item, callback) {
        try {
            console.log("model searchNote");

            /** @description As per the user input find the fields from the database */
            let result = await noteDatabase.find({ $and: [{ userId: data.userId }, item] })

            if (result == null) {
                /** @description return the error */
                console.log("error in searchNote note", err);
                callback(err);
            }
            else {
                /** @de scription return the result data */
                console.log("searchNote note successfully", result);
                callback(null, result)
            }
        }
        catch (err) {
            /** 
            * @description:Handle the exception
            */
            console.log("Error in searchNote catch block model", err);
            callback.send(err);
        }
    }



     get(findData, callback) {
        try {
            console.log("model get",findData);

            /** @description As per the user input find the fields from the database */
            let result =  noteDatabase.find(findData,(err,result)=>{

         

            if (result == null) {
                /** @description return the error */
                console.log("error in getNote note", err);
                callback(err);
            }
            else {
                /** @de scription return the result data */
                console.log("getNote note successfully", result);
                callback(null, result)
            }
        })
        }
        catch (err) {
            /** 
            * @description:Handle the exception
            */
            console.log("Error in getNote catch block model", err);
            callback.send(err);
        }
    }



    // async  searchNote(data, item, callback) {
    //     try {
    //         let Searchpromise =() => new Promise(function (resolve, reject) {

    //             console.log("model searchNote");

    //             /** @description As per the user input find the fields from the database */
    //            noteDatabase.find({ $and: [{ userId: data.userId }, item] } ,(err,result)=>{
    //             if(err){
    //                 reject({
    //                     message:"search operation faild"
    //                 })
    //             }
    //             else if (result == null) {
    //                 /** @description return the error */
    //                 console.log("error in searchNote note", err);
    //                 // callback(err);
    //                 reject({
    //                     message: "search note error",
    //                     result:result
    //                 })
    //             }
    //             else {
    //                 /** @description return the result data */
    //                // console.log("searchNote note successfully", result);
    //                 // callback( null,result)
    //                 resolve({
    //                    data:result
    //                 })
    //             }
    //            })
    //         });
    //         await Searchpromise().then((data) => {
    //             console.log("search ", data);
    //             return callback(null, data)

    //         }).catch((error) => {
    //             console.log("search", error.message);
    //             return callback(error)
    //         });

    //     }

    //     catch (err) {
    //         /** 
    //         * @description:Handle the exception
    //         */
    //         console.log("Error in searchNote catch block model", err);
    //         callback.send(err);
    //     }
    // }




}
/** @description Create the object of class */
var noteObject = new noteModel();
module.exports = noteObject;