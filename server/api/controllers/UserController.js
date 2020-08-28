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
                let payload = { subject: user._id, role: user.role, email: user.email }
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
        }
        else {
          Articles.find({where: {articlename: {contains: search}, author: email}})
            .sort("id DESC")
            .limit(2)
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
    Articles.count({articlename: {contains: search}})
      .then(function(data) {
        total_count = data;
        return Articles.find({articlename: {contains: search}}).sort(sort + " " + order).limit(limit).skip(skipPost);
      })
      .then(function(data1) {
        res.json({
          "items": data1,
          "total_count": total_count
        })
      })
      .catch(function(err) {
        console.log(err);
      })
  },

    getUser: (req, res) => {
        var arrayUser = [];
        var orderColumn = req.query.order[0].column;
        var nameColumn = req.query.columns[orderColumn].name;
        var dir

        if (req.query.order[0].dir == 'asc') {
            dir = 'ASC'
        } else {
            dir = 'DESC'
        }
        var b = {};
        b[nameColumn] = dir;

        var total

        User.count({})
            .then((data1) => {
                total = data1
                return User.find({where:{or: [{email: { contains: req.query.search.value }}, {first_name: { contains: req.query.search.value }}, {last_name: { contains: req.query.search.value } }]}}).skip(Number(req.query.start)).limit(Number(req.query.length)).sort([b]);
            })
            .then((userData) => {
                userData.forEach(element => {
                    var loginTime = moment(element.lastlogin).format('DD/MM/YYYY HH:mm:ss')
                    let view = `<button id="element.id" onClick="viewUser(${element.id})" class="btn btn-success">View</button>`
                    let edit = `<button id="element.id" style="margin-left:5px" onClick="editUser(${element.id})" class=" edituser btn btn-primary">Edit</button>`
                    let deleteButton = `<button id="element.id" style="margin-left:5px" onClick="deleteUser(${element.id})" class="btn btn-danger">Delete</button>`
                    var button
                    // if (element.role == "Admin") {
                    //     button = view + "" +  edit
                    // } else {
                        button = view + edit + deleteButton
                    //}
                    arrayUser.push([element.id, element.email, element.first_name, element.last_name, button])
                })
                return User.find({where:{or: [{email: { contains: req.query.search.value } }, {first_name: { contains: req.query.search.value } }, { last_name: { contains: req.query.search.value } } ]}})
            })
            .then((data2) => {
                return res.json({
                    "draw": req.query.draw,
                    "recordsTotal": total,
                    "recordsFiltered": data2.length,
                    "data": arrayUser
                })
            })
            .catch( (err) => {
                if (err) {
                    console.log(err)
                }
            })

    },

    editUser: (req, res) => {
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


};
