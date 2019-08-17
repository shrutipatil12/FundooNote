/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testTrashNote.js
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
const assert = require('chai').assert
function readfile(){
var jData = fs.readFileSync(`${__dirname}/testNoteData.json`);
var jsondata = JSON.parse(jData)
return jsondata
}
describe("test status of Trashed note", function () {
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/trashNote')
        .send(jsonData.trash)
        .set('_id',jsonData.trash._id)
        .end((err, res) => {     
            expect(res).to.have.status(200);
        done()
      })
      })
      it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/trashNote')
        .send(jsonData.isTrashed2)
        .set('_id',jsonData.isTrashed._id)
        .end((err, res) => {     
            expect(res).to.have.status(422);
        done()
      })
      })
      it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/trashNote')
        .send(jsonData.isTrashed3)
        .set('_id',jsonData.isTrashed._id)
        .end((err, res) => {     
            expect(res).to.have.status(404);
        done()
      })
      })
})