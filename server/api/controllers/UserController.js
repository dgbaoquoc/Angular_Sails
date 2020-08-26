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
    }
};

