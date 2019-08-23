
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :noteController.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var noteService = require('../service/noteService')
var notelogger = require('../services/internalServices/loggerServices').logger

/*************************************************************************************
* @method:createNote
* @description:this method is used to create the note
*************************************************************************************/
module.exports.createNote = (req, res) => {
  //console.log("hello\n\n\n");
  //note
  try {

    // /** @description validate user entered description */
    // req.checkBody("description", "description is not valid").isAlpha();

    // /** @description validate user entered colorNote */
    // req.checkBody("color", "colorNote is not valid").isAlpha();

    // /** @description validate user entered title */
    // req.checkBody("title", "title is not valid").isAlpha();

    // /** @description validate user entered labelNote */
    // req.checkBody("label", "labelNote is not valid").isAlpha();

    var controllerData =
    {
      // _id: req.body._id,
       userId: req.body.userId,
      description: req.body.description,
      title: req.body.title,
      // color: req.body.color,
      // label: req.body.label,
      // trash: req.body.trash,
      // archives: req.body.archives,
      // reminder: req.body.reminder,
     // image: req.body.image
    }


    //console.log("ctrl createNote", controllerData);

    console.log('ctrl createNote');
    noteService.noteServiceCreateNote(controllerData, (err, result) => {
      //notelogger.info("resultvb", result);

      var response = {};
      //= {
      //   success : false,
      //   /** @description Send the response as error */
      //   error : err
      // };
      if (err) {
        /** @description send status as false to show error  */
        response.success = false;
        response.message = "error"
        response.err = err;
        /** @description Send status code as 400 for Bad Request response status code */
        res.status(400).send(response);
        notelogger.error("result error", err)

      }
      else {

        /** @description send status as true for successful result */
        response.success = true;
        response.message = "create note data"
        /** @description Send the response as result of the function */
        response.data = result
        /** @description Send the status code as 200 for OK The request was fulfilled. */
        res.status(200).send(response)
      }
    })
  } catch (err) {
    /** 
* @description:Handle the exception
*/
    console.log("Error in catch createNote", err);

    req.send(err);
  }
}


module.exports.getAllNote=(req,res)=>{
  try{
  var getNoteData={
    id:req.decoded.payload._id
  }
  console.log("checking id from controller===>",getNoteData);
  
  var response={};
  noteService.noteServiceGetAllNote(getNoteData,(err,result)=>{
    if (err) {
      /** @description Send the false status  */
      response.success = false;
      response.message = "error"
      response.err = err;
      res.status(400).send(response);
    }
    else {
      /** @description display the result */
      response.success = true;
      response.message = "GetAllNote data"
      response.data = result
      res.status(200).send(response);
      // notelogger.er("result error", err)

    }
  })
}
catch (err) {
  /** @description Handle the exception */
  res.send(err);
  console.log("error in catch getAllNote", err);

}
}





/*************************************************************************************
* @method:trashNote
* @description:this method is used to trash the note
*************************************************************************************/

module.exports.trashNote = (req, res) => {
  try {
    /** @description Validate the trash field */
    req.checkBody("trash", "It should be a boolean value").isAlpha();

    /** @description Bind the data in one field */
    var trashData = {
      _id: req.body._id,
      //trash: req.body.trash
    }
    var response = {};
    noteService.noteServiceTrashNote(trashData, (err, result) => {
      if (err) {
        /** @description Send the false status  */
        response.success = false;
        response.message = "error"
        response.err = err;
        res.status(400).send(response);
      }
      else {
        /** @description display the result */
        response.success = true;
        response.message = "trash data"
        response.data = result
        res.status(200).send(response);
        notelogger.error("result error", err)

      }
    })
  }
  catch (err) {
    /** @description Handle the exception */
    res.send(err);
    console.log("error in catch trashNote", err);

  }
}
/*************************************************************************************
* @method:archivesNote
* @description:this method is used to archives the note 
*************************************************************************************/
module.exports.archivesNote = (req, res) => {
  console.log("archivesNote", req.body);

  try {
    /** @description Validate the archives field` */

    req.checkBody("archives", "It should be a boolean value").isAlpha();

    /** @description Bind the data and send it to the service function */
    var archivesData = {
      _id: req.body._id,
      archives: true
    }
    var response = {};

    noteService.noteServiceArchivesNote(archivesData, (err, result) => {
      if (err) {
        /** @description Send the error status */
        response.success = false;
        response.message = "error"
        response.err = err;
        res.status(400).send(response);
      }
      else {
        /** @description send the result */
        response.success = true;
        response.message = "archives data"
        response.data = result;
        res.status(200).send(response);

      }
    })
  }
  catch (err) {
    /** @description handle the exception here */
    res.send(err);
  }
}

/*************************************************************************************
* @method:reminderNote
* @description:this method is used to set reminder the note
*************************************************************************************/
module.exports.reminderNote = (req, res) => {
  try {
    var archivesData = {
      _id: req.body._id,
      reminder: req.body.reminder
    }
    var response = {};

    noteService.noteServiceReminderNote(archivesData, (err, result) => {
      if (err) {
        /** @description Send the error status */

        response.success = false;
        response.message = "error"
        response.err = err;
        res.status(400).send(response);
      }
      else {
        /** @description send the result */

        response.success = true;
        response.message = "reminder data"
        response.data = result;
        res.status(200).send(response);

      }
    })
  }
  catch (err) {
    /** @description handle the exception here */

    res.send(err);
  }
}
/*************************************************************************************
* @method:searchNote
* @description:this method is used to search the note with different fields
*************************************************************************************/
module.exports.searchNote = (req, res) => {
  try {


    /** @description validate user entered description */
    req.checkBody("description", "description is not valid").isAlpha();

    /** @description validate user entered colorNote */
    req.checkBody("colorNote", "colorNote is not valid").isAlpha();

    /** @description validate user entered title */
    req.checkBody("title", "title is not valid").isAlpha();

    /** @description validate user entered labelNote */
    req.checkBody("labelNote", "labelNote is not valid").isAlpha();

    var response = {};
    var searchData = {
      userId: req.body.userId,
      title: req.body.title,
      label: req.body.label,
      color: req.body.color,
      reminder: req.body.reminder,
      description: req.body.description
    }
    //console.log("searchData ctrl", searchData);

    noteService.noteServiceSearchNote(searchData, (err, result) => {


      if (err) {
        /** @description Send the error status */

        console.log("search note error", err);
        response.success = false;
        response.message = "error"
        response.error = err;
        res.status(400).send(err);
      }
      else {
        /** @description send the result */

        //  console.log("result in search note", result);
        response.success = true;
        response.message = "data searches successfully"
        response.data = result;
        res.status(200).send(response);
        notelogger.error("result error", err)

      }
    })
  }
  catch (err) {
    /** @description handle the exception here */

    res.send(err);
  }
}
/*************************************************************************************
* @method:getAllTrashNote
* @description:this method is used to get the all trash notes
*************************************************************************************/

module.exports.getAllTrashNote = (req, res) => {
  try {
    var response = {};
    var trashData = {
      userId: req.body.userId,
      // description: req.body.description,
      // title: req.body.title,
      // color: req.body.color,
      // label: req.body.label,
      // archives: req.body.archives,
      // reminder: req.body.reminder,
      // image: req.body.image
      trash:req.body.trash
    }
    noteService.noteServiceGetAllTrashNote(trashData, (err, data) => {
      if (err) {
        /** @description Send the error status */
        response.success = false;
        response.message = "fail to get trash data";
        response.error = err;
        res.status(400).send(response);
      }
      else {
        /** @description send the result */

        response.success = true;
        response.message = "all trash data get successfully";
        response.data = data;
        res.status(200).send(response);
        notelogger.error("result error", err)

      }
    })
  }
  catch (err) {
    /** @description handle the exception here */
    res.send(err);
    console.log("error in catch getAllTrashNote", err);

  }
}
/*************************************************************************************
* @method:getAllArchivesNote
* @description:this method is used to get the all archives notes
*************************************************************************************/
module.exports.getAllArchivesNote = (req, res) => {
  try {
    var response = {};
    var archivesData = {
      userId: req.body.userId,
     
    }
    console.log("req.decoded",req.decoded);
    
    noteService.noteServiceGetAllArchivesNote(archivesData, (err, result) => {
      if (err) {
        /** @description Send the error status */
        response.success = false;
        response.error = err;
        response.message = "fail to get achives ";
        res.status(400).send(response);
      }
      else {
        /** @description send the result */
        response.success = true;
        response.message = "successfully get all archives ";
        response.data = result;
        res.status(200).send(response);
        // notelogger.error("result error", err)

      }
    })
  }
  catch (err) {
    /** @description handle the exception here */
    console.log("error in catch getAllArchivesNote", err);

    res.send(err)
  }
}
