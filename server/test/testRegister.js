/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testRegister.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should();
chai.expect();
var server = require('../server');
var fs = require('fs')
const assert = require('chai').assert
var jData = fs.readFileSync(`${__dirname}/testData.json`)
var data = JSON.parse(jData)


describe('Test case for Registration Page', () => {
    this.timeout = 10000;
   
    it('status', (done) => {
        chai.request(server).post('/register').send(data.registration).end((err, res) => {
            if (err) {
                //Send the error message
                console.log("error in registration", err)
                err.should.have.status(400);
            }
            else {
                //expect(firstname).to.equal(30);
                //Send the result status
                console.log('result in registration ', res.body)
                res.should.have.status(200);
            }
            done();
        })
    })
        it('firstname should be in string format', done => {
            let result = data.registration.firstname;//check first name field
            assert.isString(result)//check the first name valid or not
            done();
        });

        it('password field should have minimum 3 characters length', done => {
            let result = data.registration.password;//checking password field
            let res = result.length;//Check password length
            assert.isTrue(res > 3)//check the password valid or not
            done();
        });
      })