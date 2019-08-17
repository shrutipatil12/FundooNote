/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testArchivesNote.js
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

describe("test status of Archive api", function () {
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/isArchive')
        .send(jsonData.archivesNote)
        .set('_id',jsonData.archivesNote._id)
        .end((err, res) => {     
            expect(res).to.have.status(200);
        done()
      })
      })
      it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/isArchive')
        .send(jsonData.archives)
        .set('_id',jsonData.archivesNote._id)
        .end((err, res) => {     
            expect(res).to.have.status(422);
        done()
      })
      })
      it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/isArchive')
        .send(jsonData.archivesnote)
        .set('_id',jsonData.archivesNote._id)
        .end((err, res) => {     
            expect(res).to.have.status(404);
        done()
      })
      })
    })