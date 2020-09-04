/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const { getUser } = require("../api/controllers/UserController");

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': true,

	UserController: {
    showArticles: ['isAuthenticated'],
    postArticle: ['isAuthenticated'],
    getPost: ['isAuthenticated'],
    test123: ['isAuthenticated', 'isAdmin'],
    newToken:  ['isAuthenticated'],
    test: ['isAdmin'],
    getUser: ['isAdmin'],
    editUser: ['isAdmin'],
	}
};
