const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user: 'jalalium@hotmail.fr', // generated ethereal user
      pass: 'Allahoakbar1.', // generated ethereal password
    },
  });

module.exports = transporter;