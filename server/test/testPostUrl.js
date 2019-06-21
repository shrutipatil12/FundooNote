
/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testPostUrl.js
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
    var obj=fs.readFileSync(`${__dirname}/testData.json`)
    var data = JSON.parse(obj);
    return data;
}
describe("Test case for postUrl", () => {
    it("postUrl", (done) => {
       // this.timeout=10000;
        var data=readFile();
        chai.request(server).post('/postUrl').send(data.postUrl).end((err, res) => {
            if (err) {
                console.log("error in postUrl", err);
                err.should.have.status(400)
            }
            else {
                console.log("result of postUrl", res.body);
                res.should.have.status(200);
            }

            done();
        })
    })
})