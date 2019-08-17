/******************************************************************************
 *  Execution       :cmd> node server.js                      
 *  @description    :FundooNote
 *  @file           :sendM.js
 *  @author         :Shruti
 *  @version        :1.0
 
 ******************************************************************************/

module.exports.mail = (url,email) => {
  var nodemailer = require('nodemailer');
  var smtpTransport=require('nodemailer-smtp-transport');
 console.log("in send mail");
 
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    //host:'smtp.gmail.com',
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  }));
    var mailOptions = {
    from: process.env.user,
    to:email,
    subject: 'Go through the below link ',
    text: url
  };
console.log("28 mail",mailOptions)
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

  });

}

