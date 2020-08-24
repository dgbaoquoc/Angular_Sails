/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

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

    

};

