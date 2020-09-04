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
var jwtDecode = require('jwt-decode');
var randtoken = require('rand-token');
var refreshTokens  = {};


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
    },

    resetPassword: (req, res) => {
        let token = req.body.token ? req.body.token : '';
        let email = req.body.email ? req.body.email : '';
        let password = req.body.newPassword ? req.body.newPassword : '';

        return User.findOne({email, token, deleted: {'!=': '1'}})
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
        return User.findOne({email, deleted: {'!=': '1'}})
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                let payload = { subject: user._id, role: user.role, email: user.email }
                let token = jwt.sign(payload, 'secretKey', {expiresIn: "1 day"})
                var refreshToken  = randtoken.uid(256);
                refreshTokens[refreshToken] = email;
                return res.json({status: 'success', token, refreshToken: refreshToken})
            }
            return res.json({status: 'error', message: 'Password is invalid.'})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error', message: 'Unknow Error.'})
        })
    },

  newToken: function(req, res) {
    var email = req.body.email;
    var refreshToken = req.body.refreshToken;
    if((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == email)) {
      User.findOne({email})
        .then(function(user) {
          let payload = { subject: user._id, role: user.role, email: user.email }
          let token = jwt.sign(payload, 'secretKey', {expiresIn: "1 day"});
          return res.json({status: 'success', token: token})
        })
        .catch(function(err) {
          console.log(err);
        })
    }
  },

  postArticle: function (req, res) {
    var articlename = req.param("articlename");
    var article = req.param("article");
    var dateCreated = String(moment().format("MMM DD YY"));
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwtDecode(token);
    var author = decoded.email;
    if(articlename == "" || article == "") {
      return res.json({status: "fail"});
    }
    else {
      Articles.create({
        articlename: articlename,
        article: article,
        dateCreated: dateCreated,
        author: author
      })
        .then(function (data) {
          return res.json({ status: "success" });
        })
        .catch(function (err) {
          console.log(err);
          return res.json({status: "fail"})
        });
    }
  },

  showArticles: function (req, res) {
    var token = req.headers.authorization.split(' ')[1];
    var decoded = jwtDecode(token);
    var email = decoded.email;
    var start = req.query.startArticle;
    var search = req.query.searchArticle;
    User.findOne({email: email})
      .then(function(data0) {
        if(data0.role == "admin") {
          Articles.find({where: {articlename: {contains: search}, deleted: {'!=': '1'}}})
            .sort("id DESC")
            .limit(4)
            .skip(start)
            .then(function (data) {
              res.json({ status: "success", articles: data });
            })
            .catch(function (err) {
              console.log(err);
            });
        }
        else {
          Articles.find({where: {articlename: {contains: search}, author: email, deleted: {'!=': '1'}}})
            .sort("id DESC")
            .limit(4)
            .skip(start)
            .then(function (data) {
              res.json({ status: "success", articles: data });
            })
            .catch(function (err) {
              console.log(err);
            });
        }
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
  },

  test123: function(req, res) {
    var sort = req.query.sort;
    var order = req.query.order;
    var page = req.query.page;
    var limit = req.query.limit;
    var search = req.query.search;
    var skipPost = limit * (page-1);
    var total_count;
    Articles.count({articlename: {contains: search}, deleted: {'!=': '1'}})
      .then(function(data) {
        total_count = data;
        return Articles.find({articlename: {contains: search}, deleted: {'!=': '1'}}).sort(sort + " " + order).limit(limit).skip(skipPost);
      })
      .then(function(data1) {
        res.json({
          "status": 'success',
          "items": data1,
          "total_count": total_count
        })
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  deleteArticle: function(req, res) {
    var id = req.body.id;
    Articles.update(id, {deleted: 1})
      .then(function(data) {
        res.json({status: "success", message: "Deleted successfully"})
      })
      .catch(function(err) {
        console.log(err)
        res.json({status: "fail", message: "Unknown error"})
      })
  },

  editArticle: function(req, res) {
    var id = req.query.id;
    Articles.findOne({id})
      .then(function(data) {
        res.json({status: "success", data: data})
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  saveArticle: function(req, res) {
    var id = req.body.id;
    var articlename = req.body.articlename;
    var article = req.body.article;
    var dateCreated = String(moment().format("MMM DD YY"));
    Articles.update(id, {articlename: articlename, article: article, dateCreated: dateCreated})
      .then(function(data) {
        res.json({status: "success", message: "Edited successfully"})
      })
      .catch(function(err) {
        console.log(err)
        res.json({status: "fail", message: "Unknow error"})
      })
  },

  test456: function(req, res) {
    var sort = req.query.sort;
    var order = req.query.order;
    var page = req.query.page;
    var limit = req.query.limit;
    var search = req.query.search;
    var skipPost = limit * (page-1);
    var total_count;
    User.count({email: {contains: search}, deleted: {'!=': '1'}})
      .then(function(data) {
        total_count = data;
        return User.find({email: {contains: search}, deleted: {'!=': '1'}}).sort(sort + " " + order).limit(limit).skip(skipPost);
      })
      .then(function(data1) {
        res.json({
          "status": 'success',
          "items": data1,
          "total_count": total_count
        })
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  deleteUser: function(req, res) {
    var id = req.body.id;
    User.findOne({id})
      .then(function(data0) {
        if(data0.role == "admin") {
          res.json({status: "fail", message: "You can't delete this user"})
        }
        else {
          User.update(id, {deleted: 1})
          .then(function(data) {
            res.json({status: "success", message: "Deleted successfully"})
          })
          .catch(function(err) {
            console.log(err)
            res.json({status: "fail", message: "Unknown error"})
          })
        }
      })
  },

  editUser: function(req, res) {
    var id = req.query.id;
    User.findOne({id})
      .then(function(data) {
        res.json({status: "success", data: data})
      })
      .catch(function(err) {
        console.log(err);
      })
  },

  saveUser: function(req, res) {
    var id = req.body.id;
    var email = req.body.email;
    var role = req.body.role;
    User.findOne({id})
      .then(function(data0) {
        if(data0.role == "admin") {
          res.json({status: "fail", message: "You can't edit this user"})
        }
        else {
          User.update(id, {email: email, role: role})
          .then(function(data) {
            res.json({status: "success", message: "Edited successfully"})
          })
          .catch(function(err) {
            res.json({status: "fail", message: "Unknow error"})
          })
        }
      })
  },


};
