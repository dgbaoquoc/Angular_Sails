/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true
    },
    createdAt: {
      type: 'ref',
      columnType: 'datetime',
      autoCreatedAt: true,
    },
    updatedAt: {
      type: 'ref',
      columnType: 'datetime',
      autoUpdatedAt: true,
    },

  },


  beforeCreate: function (user, callback) {
		bcrypt.genSalt(10, function (error, salt) {
			bcrypt.hash(user.password, salt, function (error, hash) {
				if (error) {
					callback(error);
				} else {
					user.password = hash;
					callback(null, user);
				}
			});
		});
	},

	beforeUpdate: function (user, callback) {
    	// Only when new password is sent
    	if (user.password) {
			bcrypt.genSalt(10, function (error, salt) {
				bcrypt.hash(user.password, salt, function (error, hash) {
					if (error) {
						callback(error);
					} else {
						user.password = hash;
						callback(null, user);
					}
				});
			});
		} else {
    		callback(null, user);
		}
	}

};

