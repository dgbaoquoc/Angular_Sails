/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var moment = require('moment');
var randomstring = require('randomstring');
var nodemailer = require('nodemailer');

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
    test: (req, res) => {
        return res.json({status: 'succcccc'})

    },

    getCurrentUser:(req, res) => {
        let token = req.headers.authorization.split(' ')[1]
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secretKey', function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded.id);
                }
            });
        })
        .then(id => {
            return User.findOne(id)
        })
        .then(user => {
            if(!user) {
                return res.json({status: 'error', user: ''})
            }
            return res.json({status: 'success', user})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error', message: 'Unknown error.'})
        })
    },

    forgot: (req, res) => {
        let email = req.body.email
        let resetCode = randomstring.generate();

        return User.findOne({email})
        .then(user => {
            if(!user) {
                return res.json({status: 'error', message: 'Email has not registerd!'})
            }
            return User.update(user.id, {token: resetCode})
        })
        .then(result => {
            let origin = 'http://localhost:4200'

            var url = origin + "/user/reset-password?email=" + encodeURIComponent(email) + "&token=" + resetCode;
            sails.renderView('email/notify/forgot_password',
                { email: email, url: url, layout: 'notify_template' }
                , function (err, view) {
                    if (err) {
                        console.log('Create forgot password template  error');
                        console.log(err);
                    }
                    var mailOptions = {
                        from: 'casanovaa2205@gmail.com',
                        to: email,
                        subject: 'BTGenomics - Reset your password',
                        html: view
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
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

                // sails.helpers.sendForgotPass(user.email, resetCode)
                return res.json({status: 'success', message: 'Please check your inbox for an email we just sent you with instructions for how to reset your password and log into your account.'})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error', message: 'Unknown error.'})
        })
    },

    resetPassword: (req, res) => {
        let token = req.body.token ? req.body.token : '';
        let email = req.body.email ? req.body.email : '';
        let password = req.body.newPassword ? req.body.newPassword : '';
        
        return User.findOne({email, token})
        .then(user => {
            if(!user) {
                return false
            }

            return User.update(user.id, {password, token: ''}).fetch()
        })
        .then(result => {
            if(result) {
                return res.json({status: 'success', message: 'New password has updated successfully.'})
            }
            return res.json({status: 'error', message: 'Email or token is wrong'})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error', message: 'Unknown error.'})
        })
    },

    register: (req, res) => {
        let email = req.body.email
        let password = req.body.password
        
        return User.findOne({email})
        .then(user => {
            if(user) {
                return false
            }
            return User.create({email, password}).fetch()
        })
        .then(result => {
            if(result) {
                return res.json({status: 'success', message: 'Your account has been registered successfully! '})
            }
            return res.json({status: 'error', message: 'Email has been used.'})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error', message: 'Unknown error.'})
        })
    },

    login: (req, res) => {
        let email = req.body.email
        let password = req.body.password
        
        return User.findOne({email})
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                let payload = { subject: user._id, role: user.role, email: user.email, id: user.id }
                let token = jwt.sign(payload, 'secretKey')
                return res.json({status: 'success', token})
            }
            return res.json({status: 'error', message: 'Password is invalid.'})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error', message: 'Unknow Error.'})
        })
    },

  postArticle: function (req, res) {
    var articlename = req.param("articlename");
    var article = req.param("article");
    var dateCreated = String(moment().format("MMM DD YY"));
    if(articlename == "" || article == "") {
      return res.json({status: "fail"});
    }
    else {
      Articles.create({
        articlename: articlename,
        article: article,
        dateCreated: dateCreated,
      })
        .then(function (data) {
          return res.json({ status: "success" });
        })
        .catch(function (err) {
          return res.json({status: "fail"})
          console.log(err);
        });
    }
  },

  showArticles: function (req, res) {
    var start = req.query.startArticle;
    var search = req.query.searchArticle;
    Articles.find({where: {articlename: {contains: search}}})
      .sort("id DESC")
      .limit(2)
      .skip(start)
      .then(function (data) {
        res.json({ status: "success", articles: data });
      })
      .catch(function (err) {
        console.log(err);
      });
  },
    getUser: (req, res) => {
        var arrayUser = [];

        User.find({})
            .then((userData) => {   
                return res.json(userData)
            })
            .catch( (err) => {
                if (err) {
                    console.log(err)
                }
            })
                
    },
    
    editUser: (req, res) => {
        console.log("hello")
        let id = req.param("id");
        console.log(id)
        User.findOne({id:id})
            .then((user) => {
                return res.json ({
                    user:user
                });
            })
            .catch (err => {
                console.log(err)
            })
    },

  getPost: function(req, res) {
    var id = req.query.idPost;
    Articles.findOne({id: id})
      .then(function(data) {
        return res.json({status: "success", post: data})
      })
      .catch(function(err) {
        console.log(err)
      })
  }
};
