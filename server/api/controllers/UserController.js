/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var moment = require('moment');

module.exports = {
    test: (req, res) => {
        return res.json({status: 'succcccc'})

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
                let payload = { subject: result._id }
                let token = jwt.sign(payload, 'secretKey')
                return res.json({status: 'success', token})
            }
            return res.json({status: 'error', message: 'Email has created.'})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error'})
        })
    },

    login: (req, res) => {
        let email = req.body.email
        let password = req.body.password
        
        return User.findOne({email})
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                let payload = { subject: user._id }
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
    console.log(req.query);
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
    }
};
