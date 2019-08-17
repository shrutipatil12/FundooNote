/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testDeleteLabel.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();
var expect=chai.expect;
var server = require('../server');
var fs = require('fs')
const assert = require('chai').assert
var jData = fs.readFileSync(`${__dirname}/testLabelData.json`);
var data = JSON.parse(jData)

describe("test cases for labels",function(){
    it("deleteLabel test case",function(done){
            chai.request(server).post('/deleteLabel').send(data.deleteLabel).set('_id',data.deleteLabel._id).end((err, res) => {     
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                done()
            })
        })
        it("deleteLabel test case",function(done){
            chai.request(server).post('/deleteLabel').send(data.deleteLabel).set('_id',data.deletelabel._id).end((err, res) => {     
                expect(res).to.have.status(404);
                done()
            })
        })
        it("deleteLabel test case",function(done){
            chai.request(server).post('/deleteLabel').send(data.deleteLabel).set('_id',data.deleteL._id).end((err, res) => {     
                expect(res).to.have.status(422);
                done()
            })
        })


})