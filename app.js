const nodemailer = require('nodemailer');
const readlineSync = require('readline-sync');

require('dotenv').config(); // For loading environmental variables

function sendEmail() {
    const from = readlineSync.question('Enter sender email address: ');
    const to = readlineSync.question('Enter recipient email address: ');
    const subject = readlineSync.question('Enter email subject: ');
    const html = readlineSync.question('Enter email HTML content: ');

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html: html
    }, (err, info) => {
        if (err) {
            console.error('Error occurred:', err);
        } else {
            console.log("Message sent: " + info.messageId);
        }
    });
}

sendEmail();
