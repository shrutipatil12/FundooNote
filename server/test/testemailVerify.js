
/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testemialVerify.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should()
var server = require('../server');
var fs = require('fs')
//const assert = require('chai').assert
var jData = fs.readFileSync(`${__dirname}/testData.json`)
var data = JSON.parse(jData)

describe("Test case for Email Verification", () => {
    it("Email Verification", (done) => {
        this.timeout=10000;
            chai.request(server).post('/isVerified').set('token',data.emailVerification.token).end((err, res) => {
            if (err) {
                //Send the error status
                console.log("error in Email Verification", err);
                err.should.have.status(400)
            }
            else {
                //Send the respose as 200 
                console.log("result of Email Verification", res.body);
               res.should.have.status(200);
            }

            done();
        })
      
    })
})