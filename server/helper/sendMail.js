const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const {
    MAILING_USERNAME,
    MAILING_PASSWORD,
    SENDER_EMAIL_ADDRESS
} = process.env

// send mail
module.exports.sendEmail = (to, user_name, subject, body) => {
    const smtpTransport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: process.env.API_KEY
        })
    );

    const mailOptions = {
        from: `Job Finder ${SENDER_EMAIL_ADDRESS}`,
        to: to,
        subject: subject,
        html: body
    }

    smtpTransport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log("sent email info:", info);
        return;
    })
}