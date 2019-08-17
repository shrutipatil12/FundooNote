

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


var labelValidation = [
    validate({
        validator: 'isLength',//Check for the length
        arguments: [3, 10],//length of the  label should be greater than 3 and less than 10
        message: "label should be in correct format",//Display the error message to user
        httpStatus: 400//Send the status
    })
]
var noteData = mongooseSchema({

    "userId": {

        type: mongoose.Schema.Types.ObjectId,
        required: [true, "userId is require"],//mandetory field
        ref: 'userData'

    },

    "label": [{
        type: String,/** @description Type should be string */
        required: [true, "label is require"],//mandetory field
        validate: labelValidation

    }],
    "note_id": [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "noteId is require"],//mandetory field
        ref: 'noteData'

    }]


});
var LabelDatabase = mongoose.model('LabelDatabase', noteData);
class LabelModel {
    constructor() { }
    async createLabel(req, callback) {
        try {
            /** @description Create the  new note */
            const newLabel = new LabelDatabase(req);
            newLabel.save((err, data) => {
                if (err) {
                    console.log("error in creating the label", err);
                    callback(err)
                }
                else {
                    console.log("success", data);
                    callback(null, data)
                }
            })
        }
        catch (err) {
            /** 
            * @description:Handle the exception
            */
            console.log("error in catch createLabel", err);

            callback(err);
        }
    }


    async getLabel(data, callback) {
        try {
            console.log("model getLabel");

            /** @description As per the user input find the fields from the database */
            //let result=await noteDatabase.find({ $and: [{ userId: data.userId },item]}) 
            let result = await LabelDatabase.find({ userId: data.userId })

            if (result == null) {
                /** @description return the error */
                console.log("error in getLabel note", err);
                callback(err);
            }
            else if (result) {
                /** @description return the result data */
                console.log("getLabel note successfully", result);
                callback(null, result)
            }
        }
        catch (err) {
            /** 
            * @description:Handle the exception
            */
            console.log("Error in getLabel catch block model", err);
            callback.send(err);
        }
    }

    updateLabel(data, callback) {
        try {
            console.log("in model updateLabel");
            LabelDatabase.findOne(data.searchData, data.updateData, (err, res1) => {
                if (err) {
                    /** @description return the error */
                    console.log("error in findOne", err);

                }
                else {
                    /** @description return the result data */
                    // console.log("result", res1);

                }
            })

            LabelDatabase.update(data.searchData, data.updateData,
                (err, res) => {
                    if (err) {
                        /** @description return the error */
                        console.log("in model updateLabel", err);

                        callback(err)
                    }
                    else {
                        /** @description return the result data */
                        console.log("in model updateLabel", data);
                        callback(null, res)
                    }
               })
        }
        catch (err) {
            callback(err);
            console.log("error in updateLabel catch", err);
        }
    }


    deleteLabel(data, deleteBody, callback) {
        try {
            console.log("in model deleteLabel");
            LabelDatabase.findOne({ _id: data._id }, (err, res1) => {
                if (err) {
                    /** @description return the error */
                    console.log("error in findOne", err);
                }
                else {
                    // console.log("result", res1);

                }
            })

            LabelDatabase.deleteOne({ _id: data._id }, deleteBody,
                (err, res) => {
                    if (err) {
                        /** @description return the error */
                        console.log("in model deleteLabel", err);

                        callback(err)
                    }
                    else {
                        // console.log("in model deleteLabel", res);
                        /** @description return the result data */
                        return callback(null, data)
                    }
                })

        }
        catch (err) {
            callback(err);
            console.log("error in deleteLabel catch", err);


        }
    }
}
/** @description Create the object of class */
var LabelObject = new LabelModel();
module.exports = LabelObject;