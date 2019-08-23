
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :noteService.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var noteModel = require('../model/noteModel')

class noteService {
    constructor() { }
    noteServiceCreateNote(data, callback) {
        try {

            noteModel.createNote(data, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in create note service", err);
                    callback(err);

                }
                else {
                    /** @description display the result */
                    console.log("result in service create note\n\n", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /**  Handle the exception */
            console.log("Error in catch createNote note", err);
            callback(err)
        }
    }

    noteServiceGetAllNote(res,callback){
        try {
            //console.log("req in service: ", req);

            var getNoteData = {
                userId:res.id,
                trash:false,
                archives:false
            }
            console.log("in getNotenote", res)
            noteModel.get(getNoteData, (err, result) => {
                if (err) {
                    /**  Send the error message */
                    console.log("services error");
                    callback(err);
                }
                else {
                    /**  display the result */
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /**  @description:Handle the exception */
            console.log(" error in services catch getAllNote", err);
            callback(err);
        }
    }

    noteServiceTrashNote(res, callback) {
        try {
            //console.log("req in service: ", req);

            var trashData = {
                _id: res._id,
                "trash": true
            }
            console.log("in trashnote", res)
            noteModel.update(res, trashData, (err, result) => {
                if (err) {
                    /**  Send the error message */
                    console.log("services error");
                    callback(err);
                }
                else {
                    /**  display the result */
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /**  @description:Handle the exception */
            console.log(" error in services catch verify", err);
            callback(err);
        }
    }


    noteServiceArchivesNote(data, callback) {
        try {
            var archivesData = {
                _id: data._id,
                archives: data.archives
            }
            noteModel.update(data, archivesData, (err, result) => {
                console.log("noteServiceArchivesNote", archivesData);

                if (err) {
                    /** @description Send the error message */
                    console.log("error in archives note service", err);
                    callback(err);

                }
                else {
                    /** @description display the result */
                    console.log("result in service archives note", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("Error in catch archives note", err);
            callback(err)
        }
    }

    noteServiceReminderNote(data, callback) {
        try {
            var reminderData = {
                _id: data._id,
                reminder: data.reminder
            }
            noteModel.update(data, reminderData, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in reminder note service", err);
                    callback(err);

                }
                else {
                    /** @description display the result */
                    console.log("result in service reminder note", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("Error in catch reminder note", err);
            callback(err)
        }
    }



    noteServiceSearchNote(data, callback) {

        var searchItem = {
            $or: [
                { label: data.label },
                { title: data.title },
                { description: data.description },
                { color: data.color },
                { reminder: data.reminder }
            ]
        }

        try {
            noteModel.searchNote(data, searchItem, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in search note service", err);
                    callback(err);

                }
                else {
                    /** @description display the result */
                    console.log("result in service search note", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("Error in catch search note", err);
            callback(err)
        }
    }


    noteServiceGetAllTrashNote(data, callback) {
        try {
            var trashData = {
                "trash": true
            }
            noteModel.searchNote(data, trashData, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in GetAllTrashNote", err);
                    callback(err);
                }
                else {
                    /** @description display the result */
                    console.log("result in GetAllTrashNote", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("error in catch noteService GetAllTrashNote", err);
            callback(err);
        }
    }

    noteServiceGetAllArchivesNote(data, callback) {
        try {
            var archivesData = {
                archives: true,
                userId:data.userId
            }
            noteModel.get(archivesData, (err, result) => {
                if (err) {
                    /** @description Send the error message */
                    console.log("error in getArchivesNote", err);
                    callback(err);
                }
                else {
                    /** @description display the result */
                    console.log("result in getArchivesNote ", result);
                    callback(null, result)
                }
            })
        }
        catch (err) {
            /** @description Handle the exception */
            console.log("err in getArchivesNote catch", err);
            callback(err);
        }
    }


}
var noteObject = new noteService();
module.exports = noteObject;