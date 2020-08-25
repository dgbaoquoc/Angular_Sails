/**
 * ArticleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var moment = require('moment');


module.exports = {
    getArticle: (req, res ) => {
        console.log("hello bi dep trai")
        var arrayArticle = []
        var total;

        var orderColumn = req.query.order[0].column;
        var nameColumn = req.query.columns[orderColumn].name;
        var dir

        if (req.query.order[0].dir == 'asc') {
            dir = 'ASC'
        } else {
            dir = 'DESC'
        }
        var a = {};
        a[nameColumn] = dir;

        Articles.count({})
            .then((data) => {
                total = data
                return Articles.find({ where: { or: [{ title: { contains: req.query.search.value } }, { author: { contains: req.query.search.value } }] } }).skip(Number(req.query.start)).limit(Number(req.query.length)).sort([a]);
            })
            .then((articleData) => {
                articleData.forEach(element => {
                    var articleTime = moment(element.date).format('DD/MM/YYYY HH:mm:ss')
                    var button = `<button id="element.id" onClick="viewArticle(${element.id})" class="btn btn-success">View</button>  <button id="element.id" onClick="getArticle(${element.id})" class="btn btn-primary">Edit</button>  <button id="element.id" onClick="deleteArticle(${element.id})" class="btn btn-danger">Delete</button>`
                    arrayArticle.push([element.id, element.title, element.author, articleTime, button])
                });
                return Articles.find({ where: { or: [{ title: { contains: req.query.search.value } }, { author: { contains: req.query.search.value } }]} })
            })
            .then((dataArticle) => {
                return res.json({
                    "draw": req.query.draw,
                    "recordsTotal": total,
                    "recordsFiltered": dataArticle.length,
                    "data": arrayArticle
                })
            })
    }

}