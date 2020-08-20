/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



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

    

};

