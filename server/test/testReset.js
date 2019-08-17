
/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testReset.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should()
var server = require('../server');
var fs = require('fs')
const assert = require('chai').assert
var jData = fs.readFileSync(`${__dirname}/testData.json`)
var data = JSON.parse(jData)

describe("Test case for Reset Password", () => {
    it("Reseting Password", (done) => {
        this.timeout=10000;
        //var data=readFile();
        chai.request(server).post('/reset/:token').set('token',data.resetPassword.token).end((err, res) => {
           // chai.request(server).post("/reset/:token").send(data.login).end((err, res) => {
  
        if (err) {
                //Send error message
                console.log("error in reset", err);
                //Set status as 400 
                err.should.have.status(400)
            }
            else {
                //Send the result
                console.log("result of reset password", res.body);
                res.should.have.status(200);
            }

            done();
        })
        it('password field should have minimum 3 characters length',done => {
            let result = data.resetPassword.password;//check password field
            let res = result.length;//check the password length
            assert.isTrue(res > 3)//check the field is valid or not
            done();
            });
    })
})