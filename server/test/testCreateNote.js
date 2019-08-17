/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testCreateNote.js
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
describe('Test case for create note', () => {
    this.timeout = 10000;
    it('title should be in string format', done => {
        let result = jsondata.create.title;//check title field
        chai.assert.isString(result)//check the title name valid or not
        done();
    });

    it('title should be in number format', done => {
        let result = jsondata.create.title;//check title field
        chai.assert.isNotNumber(result)//check the title name valid or not
        done();
    });


    it('title field should have minimum 3 characters length', done => {
        let result = jsondata.create.title;//checking title field
        let res = result.length;//Check title length
        chai.assert.isTrue(res > 3)//check the title valid or not
        done();
    });

    it('description should be in string format', done => {
        let result = jsondata.create.description;//check description field
        chai.assert.isString(result)//check the description name valid or not
        done();
    });

    it('trash should be in Boolean format', done => {
        let result = jsondata.create.trash;//check trash field
        chai.assert.isNotNaN(result, "trash value should not be a number")//check the trash value should not be number format
        done();
    });

    it('archives should be in Boolean format', done => {
        let result = jsondata.create.archives;//check archives field
       chai.assert.isNotNaN(result, "archives value should not be a number")//check the archives value should not be number format
        done();
    });

describe("test status of createNote ", function () {
    it("Should return 200 and confirmation for valid input", function (done) {
        
        var jsonData = readfile()
        chai.request(server)
        .post('/createNote')
        .send(jsonData.create)
        .set('_id',jsonData.create.userId).end((err, res) => {     
            expect(res).to.have.status(200);
        done()
      })
    })
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/createNote')
        .send(jsonData.createNote)
        .set('_id',jsonData.create.userId).end((err, res) => {     
            expect(res).to.have.status(400);
        done()
      })
    })
    it("Should return 200 and confirmation for valid input", function (done) {
        var jsonData = readfile()
        chai.request(server)
        .post('/createNote')
        .send(jsonData.createnote)
        .set('_id',jsonData.create.userId).end((err, res) => {     
            expect(res).to.have.status(422);
        done()
      })
    })
    
})
})
