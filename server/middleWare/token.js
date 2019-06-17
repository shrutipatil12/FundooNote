/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :token.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/
const jwt = require('jsonwebtoken');
module.exports = {
  generateNewToken(payload) {
    const token = jwt.sign({ payload }, 'secretkey', { expiresIn: '1d' })
    const Obj = {
      success: true,
      message: "Token Genereted",
      token: token
    }
    return Obj;
  }
}