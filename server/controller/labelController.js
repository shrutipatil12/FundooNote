
/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :labelController.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
var labelService = require('../service/labelService')
var logger = require('../services/internalServices/loggerServices')

/*************************************************************************************
* @method:createLabel
* @description:this method is used to create the lable
*************************************************************************************/
module.exports.createLabel = (req, res) => {
  try {

    var controllerData =
    {
      // _id:req.body._id,
      userId: req.body.userId,
      label: req.body.label,
      note_id: req.body.note_id

    }

    console.log('ctrl createLabel');
    labelService.labelServiceCreateLabel(controllerData, (err, result) => {
      console.log("resultvb", result);

      var response = {};
      if (err) {
        /**  send status as false to show error  */

        response.success = false;
        response.message = "error"
        response.err = err;
        /**  Send status code as 400 for Bad Request response status code */

        res.status(400).send(response);
        logger.error("result error", err)
      }
      else {

        /** @description send status as true for successful result */
        response.success = true;
        response.message = "create label data"
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
    console.log("Error in catch createlabel", err);

    req.send(err);
  }
}
/*************************************************************************************
* @method:getLabel
* @description:this method is used to get the lable
*************************************************************************************/
module.exports.getLabel = (req, res) => {
  try {
    var response = {};
    var getData = {
      userId: req.body.userId

    }

    labelService.labelServiceGetLabel(getData, (err, result) => {


      if (err) {
        /** @description Send the error status */

        console.log("get note error", err);
        response.success = false;
        response.message = "error"
        response.error = err;
        res.status(400).send(err);
        logger.error("result error", err)
      }
      else {
        /** @description send the result */

        //  console.log("result in search note", result);
        response.success = true;
        response.message = "label data get successfully"
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
* @method:updateLabel
* @description:this method is used to update the lable
*************************************************************************************/
module.exports.updateLabel = (req, res) => {
  try {
    console.log("in ctrl updateLabel");

    var response = {};
    var updateData = {
      'searchData': {
        _id: req.body._id
      },
      'updateData': {
        label: req.body.label
      }
    }
    labelService.labelServiceUpdateLabel(updateData, (err, data) => {
      if (err) {
        console.log("in ctrl updateLabel if");
        /**  send status as false to show error  */

        response.success = false;
        response.message = "fail to update label";
        response.error = err;
        res.status(400).send(response);
        logger.error("result error", err)
      }
      else {
        console.log("in ctrl updateLabel else");
        /**  send status as true for successful result */

        response.success = true;
        response.message = "label update successfully";
        response.data = data;
        res.status(200).send(response)


      }
    })
  }
  catch (err) {
    /** 
* @description:Handle the exception
*/
    res.send(err);
    console.log("updateLabel catch block error", err);

  }
}
/*************************************************************************************
* @method:deleteLabel
* @description:this method is used to delete the lable
*************************************************************************************/
module.exports.deleteLabel = (req, res) => {
  try {
    var response = {};
    var deleteData = {
      _id: req.body._id
    }
    labelService.labelServiceDeleteLabel(deleteData, (err, result) => {
      if (err) {
        /**  send status as false to show error  */

        response.success = false;
        response.error = err;
        response.message = "fail to delete label";
        res.status(400).send(response);
        logger.error("result error", err)
      }
      else {
        /**  send status as true for successful result */

        response.success = true;
        response.message = "label deleted successfully"
        response.data = result;
        res.status(200).send(response);


      }
    })
  }
  catch (err) {
    /** 
* Handle the exception
*/
    res.send(err);
    console.log("error in catch deleteLabel", err);

  }
}

/*************************************************************************************
* @method:addNoteInLabel
* @description:this method is used to add  the note into lable
*************************************************************************************/
module.exports.addNoteInLabel = (req, res) => {
  try {
    var response = {};
    var addData = {
      'searchById': {
        _id: req.body._id
      }, 'addNote': {
        '$addToSet': { note_id: req.body.note_id }
      }
    }
    labelService.labelServiceAddNoteInLabel(addData, (err, result) => {
      if (err) {
        /**  send status as false to show error  */

        response.success = false;
        response.error = err;
        response.message = "fail to add note in label";
        res.status(400).send(response);
        logger.error("result error", err)
      }

      else {
        /**  send status as true for successful result */

        response.success = true;
        response.message = "note added successfully in label"
        response.data = result;
        res.status(200).send(response);
      }
    })
  }
  catch (err) {
    /** 
* @description:Handle the exception
*/
    res.send(err);
    console.log("error in catch addNoteInLabel", err);

  }
}
/*************************************************************************************
* @method:deleteNoteFromLabel
* @description:this method is used to delete the note from the lable
*************************************************************************************/
module.exports.deleteNoteFromLabel = (req, res) => {
  try {
    var response = {};
    var addData = {
      'searchById': {
        _id: req.body._id
      }, 'addNote': {
        '$pull': { note_id: req.body.note_id }
      }
    }
    labelService.labelServiceDeleteNoteFromLabel(addData, (err, result) => {
      if (err) {
        /**  send status as false to show error  */

        response.success = false;
        response.error = err;
        response.message = "fail to delete note in label";
        res.status(400).send(response);
        logger.error("result error", err)
      }
      else {
        /**  send status as true for successful result */

        response.success = true;
        response.message = "note  deleted successfully from label"
        response.data = result;
        res.status(200).send(response);
      }
    })
  }
  catch (err) {
    /** 
* @description:Handle the exception
*/
    res.send(err);
    console.log("error in catch deleteNoteFromLabel", err);

  }
}
