/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testReminderNote.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();
var expect = chai.expect
var server = require('../server');
var fs = require('fs')
function readfile(){
const assert = require('chai').assert
var jData = fs.readFileSync(`${__dirname}/testNoteData.json`);
var jsonData = JSON.parse(jData)
return jsonData
}

describe("test status of remainder ", function () {
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/remainder')
        .send(jsonData.reminderNotes)
        .set('_id',jsonData.reminderNotes._id)
        .end((err, res) => {     
            expect(res).to.have.status(200);
        done()
      })
      })
      it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/remainder')
        .send(jsonData.reminder)
        .set('_id',jsonData.reminderNotes._id)
        .end((err, res) => {     
            expect(res).to.have.status(400);
        done()
      })
      })
      it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/remainder')
        .send(jsonData.remindernotes)
        .set('_id',jsonData.reminderNotes._id)
        .end((err, res) => {     
            expect(res).to.have.status(404);
        done()
      })
      })

})
