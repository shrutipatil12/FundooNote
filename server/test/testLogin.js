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
function readFile() {
    var obj = fs.readFileSync('/home/user/FundooNote/server/test/testData.json')
    var data = JSON.parse(obj);
    return data;
}
describe('Test case for Login page', () => {

    it("login successfuly or not", (done) => {
        var data=readFile();
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
    })
})