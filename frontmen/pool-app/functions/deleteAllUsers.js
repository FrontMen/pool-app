const ObjectID = require('mongodb').ObjectID;
const connectDb = require('../lib/connectDb');

/**
 * @param {string} id 
 */
module.exports = (id, context, callback) => {
  try {
    if (id !== '987654321') {
      throw new Error('unauthorized');
    }
    return connectDb(db => deleteAllUsers(db, callback));
  } catch (error) {
    return callback(error);
  }
};

const deleteAllUsers = (db, callback) => {
  connectDb(db => {
    return db.collection('users').remove({}, (err, result) => {
      return callback(err, result);
    });
  });
};
