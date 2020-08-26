/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const Article = require("../api/models/Articles");

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //UserController
  // '/': 'UserController.register',
  'POST /register': 'UserController.register',
  'POST /login': 'UserController.login',
  'POST /forgot': 'UserController.forgot',
  'POST /reset-password': 'UserController.resetPassword',
  'GET /getCurrentUser': 'UserController.getCurrentUser',


  '/test': 'UserController.test',
  'POST /createArticle': 'UserController.postArticle',
  'GET /showArticles': 'UserController.showArticles',
  'GET /register': 'UserController.register',
  'GET /getuser': 'UserController.getUser',
  'POST /edituser': 'UserController.editUser',
  'GET /getPost': 'UserController.getPost',


  //ArticleController
  'GET /getarticle': 'ArticleController.getArticle',
  'GET /getPosts': 'PostsController.getPosts',
  'GET /posts/:id': 'PostsController.getDetailArticle',
  'POST /getSearchedPosts': 'PostsController.getSearchedPosts'

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
