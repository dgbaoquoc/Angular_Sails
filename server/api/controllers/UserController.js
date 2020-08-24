/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var moment = require("moment");

module.exports = {
  register: (req, res) => {
    return User.create({ email: "coup@gmail.com", password: "123" }).then(
      (result) => {
        return res.json({ status: "success" });
      }
    );
  },

  login: (req, res) => {
    return res.json({ status: "success" });
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

  getPost: function(req, res) {
    var id = req.query.idPost;
    Articles.findOne({id: id})
      .then(function(data) {
        return res.json({status: "success", post: data})
      })
      .catch(function(err) {
        console.log(err)
      })
  }
};
