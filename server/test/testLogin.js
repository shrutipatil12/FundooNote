/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testLogin.js
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

describe('Test case for Login page', () => {

    it("login successfuly or not", (done) => {
        this.timeout=10000;
        //var data=readFile();
        chai.request(server).post("/login").send(data.login).end((err, res) => {
            if (err) {
                console.log('error in email verification', err)
                err.should.have.status(400)
            }
            else {
                console.log('result of login ', res.body);
                res.should.have.status(200);
            }
            done();
            
    })
    it('password field should have minimum 3 characters length',done => {
        let result = data.login.password;
        let res = result.length;
        assert.isTrue(res > 3)
        done();
        });
})
})
