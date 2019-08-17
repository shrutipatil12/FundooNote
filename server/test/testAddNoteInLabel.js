/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testAddNoteInLabel.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/
var program = require('commander');

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();
var expect=chai.expect
var server = require('../server');
var fs = require('fs')
const assert = require('chai').assert
var jData = fs.readFileSync(`${__dirname}/testLabelData.json`);
var data = JSON.parse(jData)
describe("test cases for labels",function(){
    it("addNoteInLabel test case",function(done){
            chai.request(server).post('/addNoteInLabel').send(data.addNoteInLabel).set('_id',data.addNoteInLabel._id).end((err, res) => {     
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                done()
            })
        })
        it("addNoteInLabel test case",function(done){
            chai.request(server).post('/addNoteInLabel').send(data.addNoteInlabel).set('_id',data.addNoteInLabel._id).end((err, res) => {     
                expect(res).to.have.status(404);
                done()
            })
        })
        it("addNoteInLabel test case",function(done){
            chai.request(server).post('/addNoteInLabel').send(data.addNoteInL).set('_id',data.addNoteInLabel._id).end((err, res) => {     
                expect(res).to.have.status(422);
                done()
            })
        })


})