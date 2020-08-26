/**
 * Posts.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
      required: true
    },
    author: {
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

