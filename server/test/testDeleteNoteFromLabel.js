/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testDeleteNoteFromLabel.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

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
    it("deleteNoteFromLabel test case",function(done){
            chai.request(server).post('/deleteNoteFromLabel').send(data.deleteNoteFromLabel).set('_id',data.deleteNoteFromLabel._id).end((err, res) => {     
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                done()
            })
        })
        it("deleteNoteFromLabel test case",function(done){
            chai.request(server).post('/deleteNoteFromLabel').send(data.deleteNoteFromlabel).set('_id',data.deleteNoteFromLabel._id).end((err, res) => {     
                expect(res).to.have.status(404);
                done()
            })
        })
        it("deleteNoteFromLabel test case",function(done){
            chai.request(server).post('/deleteNoteFromLabel').send(data.deleteNoteFromL).set('_id',data.deleteNoteFromLabel._id).end((err, res) => {     
                expect(res).to.have.status(422);
                done()
            })
        })


})