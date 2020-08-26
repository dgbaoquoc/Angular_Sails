/**
 * ArticleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var moment = require('moment');


module.exports = {
    getArticle: (req, res ) => {
        Articles.find({})
            .then((articleData) => {
                return res.json(articleData)
            })
            .catch( (err) => {
                if (err) {
                    console.log(err)
                }
            })
    }

}