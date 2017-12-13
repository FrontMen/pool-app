const ObjectID = require('mongodb').ObjectID;
const connectDb = require('../src/connectDb');

let cache = null;
/**
 * @param {string} id 
 * @param {Object} update
 */
module.exports = (id, update, callback) => {
  try {
    return connectDb(db => updateUser(db, id, update, callback));
  } catch (error) {
    return callback(error);
  }
};

const updateUser = (db, id, update, callback) => {
  connectDb(db => {
    return db.collection('users').updateOne({ _id: new ObjectID(id) }, { $set: update }, (err, result) => {
      return callback(err, result);
    });
  });
};

