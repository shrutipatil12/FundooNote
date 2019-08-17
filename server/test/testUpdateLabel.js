/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testUpdatePhoto.js
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
    it("updateLabel test case",function(done){
            chai.request(server).post('/updateLabel').send(data.updateLabel).set('_id',data.updateLabel._id).end((err, res) => {     
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                done()
            })
        })
        it("updateLabel test case",function(done){
            chai.request(server).post('/updateLabel').send(data.updatelabel).set('_id',data.updateLabel._id).end((err, res) => {     
                expect(res).to.have.status(404);
                done()
            })
        })
        it("updateLabel test case",function(done){
            chai.request(server).post('/updateLabel').send(data.updateL).set('_id',data.updateLabel._id).end((err, res) => {     
                expect(res).to.have.status(422);
                done()
            })
        })


})