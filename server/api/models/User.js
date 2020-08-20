/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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

};

