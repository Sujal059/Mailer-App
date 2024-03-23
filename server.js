require('dotenv').config();
const express = require('express');
const sendEmail = require('./utils/sendEmail');


const app = express();
const PORT = process.env.PORT || 9000;

//set engine
app.set('view engine', 'ejs');

//server static assets
app.use(express.static("public"));

//pass the data from form
app.use(express.urlencoded({extended: false}));

//routes to render email form
app.get('/', (req,res)=>[
    res.render('email-form')
]);

//route to send the email
app.post("/send-email", async (req, res)=>{
    const {email,subject, message} = req.body;
    try {
        sendEmail(email,subject, message);
        res.render('email-form', {
            status: 'Success',
            message: 'Email sent successfully'
        })
    } catch (error) {
        console.log(error);
        res.render('email-form',{
            status: 'Error',
            message: 'Error in sending email',
        });
    }
})

//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

