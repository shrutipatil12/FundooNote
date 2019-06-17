/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testRegister.js
 * @author      : shruti
 * @version     : 1.0
 ******************************************************************************************/

var chai = require('chai')
var chaiHttp = require('chai-http')
chai.use(chaiHttp);
chai.should()
var server = require('../server');
var fs = require('fs')
function readFile() {
    var obj = fs.readFileSync('/home/user/FundooNote/server/test/testData.json')
    var data = JSON.parse(obj);
    return data;
}

describe('Test case for Registration Page', () => {
    var data = readFile();
    // console.log(data.registration)
    it('status', (done) => {
        chai.request(server).post('/register').send(data.registration).end((err, res) => {
            if (err) {
                console.log("error in registration", err)
                err.should.have.status(400);
            }
            else {
                console.log('result in registration ', res.body)
                res.should.have.status(200);
            }
            done();
        })
    })
})