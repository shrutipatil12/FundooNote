
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :labelService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var labelModel = require('../model/labelModel')

class LabelService {
    constructor() { }
    labelServiceCreateLabel(data, callback) {
        try {

            labelModel.createLabel(data, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in create label service", err);
                    callback(err);

                }
                else {
                    /** @description display the result */
                    console.log("result in service create label\n\n", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /**  Handle the exception */
            console.log("Error in catch create  label", err);
            callback(err)
        }
    }


    labelServiceGetLabel(data, callback) {
        try {
            //console.log("noteServiceSearchNote in try", searchItem);

            labelModel.getLabel(data, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in getLabelservice", err);
                    callback(err);

                }
                else {
                    /** @description display the result */
                    console.log("result in service getLabel", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("Error in catch getLabel", err);
            callback(err)
        }
    }


    labelServiceUpdateLabel(data, callback) {
        try {
            console.log("in service updateLabel");
            // var updateData = {
            //     _id: data._id,
            //     label: data.label
            // }
            labelModel.updateLabel(data, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in updateLabel service", err);
                    callback(err);


                }
                else {
                    /** @description display the result */
                    console.log("result in service updateLabel ", result);
                    callback(null, result);


                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            callback(err);
            console.log("error in catch updateLabel", err);

        }
    }

    labelServiceDeleteLabel(data, callback) {
        try {
            var item = {
                _id: data._id
            }
            labelModel.deleteLabel(data, item, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in service deleteLAbel", err);
                    callback(err);
                }
                else {
                    /** @description display the result */
                    console.log("result in service deleteLabel", result);
                    callback(null, result)

                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("error in deletelabel catch", err);
            callback(err);
        }
    }

    labelServiceAddNoteInLabel(data, callback) {
        try {

            labelModel.updateLabel(data, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in service AddNoteInLabel", err);
                    callback(err);
                }
                else {
                    /** @description display the result */
                    console.log("result in service AddNoteInLabel", result);
                    callback(null, result)

                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("error in AddNoteInLabel catch", err);
            callback(err);
        }
    }
    labelServiceDeleteNoteFromLabel(data, callback) {
        try {

            labelModel.updateLabel(data, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in service deleteNoteFromLabel", err);
                    callback(err);
                }
                else {
                    /** @description display the result */
                    console.log("result in service deleteNoteFromLabel", result);
                    callback(null, result)

                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("error in deletelabel catch", err);
            callback(err);
        }
    }

}
var labelObject = new LabelService();
module.exports = labelObject;