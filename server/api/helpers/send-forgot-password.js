
const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars');
const path = require("path");

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {        
        user: 'casanovaa2205@gmail.com',
        pass: 'coup1234'
    }
});

module.exports = {
  
    fn: (email, code) => {
        console.log('123')
        let origin = 'localhost:1337'

        var url = origin + "/user/reset-password?email=" + encodeURIComponent(email) + "&token=" + code;

        sails.renderView('emails/notify/forgot_password',
            { email: email, url: url, layout: 'notify_template' }
            , function(err, view) {
                if (err) {
                    console.log('Create forgot password template  error');
                    console.log(err);
                }
                var mailOptions = {
                    from: 'casanovaa2205@gmail.com',
                    to: email,
                    subject: 'BTGenomics - Reset your password' ,
                    html: view
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error){
                        console.log('Send mail error')
                        console.log(email)
                        console.log(error)
                        console.log(mailOptions)
                    } else {
                        console.log('Send forgot password mail success.')
                        console.log(email)
                    }
                });
        })
  
    }
  
  };