/**
<<<<<<< HEAD
 * User.js
=======
 * Article.js
>>>>>>> origin/bi-dev-Aug-19-2020
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
      title: {
        type: 'string',
        unique: true,
        required: true,
      },
      author: {
        type: 'string',
        required: true
      },
      date: {
        type: 'ref',
        columnType: 'datetime',
        autoCreatedAt: true
    },
      description: {
        type: 'string',
        required: true
      },
      content: {
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
  
  
