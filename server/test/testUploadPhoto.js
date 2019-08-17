/******************************************************************************************
 * @Purpose     : write the testcases for testing backend using mocha and chai
 * @file        : testUploadPhoto.js
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
    var obj = fs.readFileSync(`${__dirname}/testData.json`)
    var data = JSON.parse(obj);
    return data;
}
describe('Test case for uploadPhoto ', () => {

    it("uploadPhoto done successfuly or not", (done) => {
        this.timeout = 90000;
        //var data=readFile();
        chai.request(server).post("/uploadPhoto").attach('image','/home/user/Pictures/FlowerDemo.jpeg')
        .end((err, res) => {
            if (err) {
                //Send the error status on console
                console.log('error in uploadPhoto', err)
                err.should.have.status(400)
            }
            else {
                //Send the result status
                console.log('result of uploadPhoto ', res.body);
                res.should.have.status(200);
            }
            
        })
        done();
    })
})