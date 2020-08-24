/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var moment = require('moment');

module.exports = {
    register: (req, res) => {
        // console.log(req.body)
        return User.create({email: 'coup@gmail.com', password: '123'})
        .then(result => {
            return res.json({status: 'success'})
        })
    },

    login: (req, res) => {
        console.log(req.body)
        return res.json({status: 'success'})
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

