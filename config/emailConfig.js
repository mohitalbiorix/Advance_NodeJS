const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // service: "Outlook365",
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_FROM,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
