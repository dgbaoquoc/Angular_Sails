/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token == null) {
        return res.status(401).send('Unauthorized request')
    }
    jwt.verify(token, 'secretKey', function(err, decoded) {
        if(err) {
            return res.status(401).send('Unauthorized request')
        }
        req.userId = decoded.data
        next()
        return
    });
}