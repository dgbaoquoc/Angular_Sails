/**
 * PostsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var jwt = require('jsonwebtoken');


module.exports = {
    getPosts: (req, res) => {
        let limit = req.param('limit')

        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request')
        }

        let token = req.headers.authorization.split(' ')[1]
        
        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secretKey', function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        })
            .then(result => {
                let email = result.email;
                return Posts.find({author: email}).limit(limit)
            })
            .then(result => {
                return res.json({status: 'success', articles: result})
            })
            .catch(err => {
                if(err) console.log(err)
                return res.json({status: 'error', articles: []})
            })
    },

    getSearchedPosts: (req, res) => {
        let value = req.body.value
        let token = req.headers.authorization.split(' ')[1]

        return new Promise((resolve, reject) => {
            jwt.verify(token, 'secretKey', function (err, decoded) {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded.email);
                }
            });
        })
            .then(author => {
                return Posts.find({
                    title: {
                        'contains': value
                    },
                    author
                })
            })
            .then(result => {
                return res.json({status: 'success', articles: result})
            })
            .catch(err => {
                if(err) console.log(err)
                return res.json({status: 'error', articles: []})
            })
    },

    getDetailArticle: (req, res) => {
        let id = req.param('id')

        return Posts.findOne(id)
        .then(article => {
            if(!article) {
                return res.json({status: 'error', article: ''})
            }

            return res.json({status: 'success', article})
        })
        .catch(err => {
            if(err) console.log(err)
            return res.json({status: 'error', articles: ''})
        })
    }
};

