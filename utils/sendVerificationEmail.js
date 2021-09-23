const sendgrid = require('@sendgrid/mail');
require('dotenv').config();

const {SENDGRID_API_KEY} = process.env;

sendgrid.setApiKey(SENDGRID_API_KEY);

const sendEmail = (mail, token) => {
    const msg = {
        to: mail,
        from: 'amarel@online.ua', // Change to your verified sender
        subject: 'Verification of your email',
        html: `<p>Thank you for the registration at our site!</p><p>Please, follow the <a href="http://localhost:3000/api/users/verify/${token}">link</a> to confirm your email and finish your registration process.</p>`,
      }
    sendgrid.send(msg).then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        });
};

module.exports = sendEmail;