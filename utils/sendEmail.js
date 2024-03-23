const nodemailer = require('nodemailer');

const sendEmail = async (to,subject,messageConetnt)=>{
    try {
        //create transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ID,
                pass:process.env.EMAIL_PASSWRD
            }
        });
        //message obj
        const message = {
            to,
            subject: {subject},
            html: `
                <h3>You have recieved a new message from Node Mailer App</h3>
                <p>${messageConetnt}</p>`,
        };
        //send the email
        const info = await transporter.sendMail(message);
        console.log('Message sent', info.messageId);


    } catch (err) {
        console.log(err);
        throw new Error("Email could not be sent");
    }
};

module.exports = sendEmail;