const ObjectID = require('mongodb').ObjectID;
const connectDb = require('../src/connectDb');

let cache = null;
/**
 * @param {string} id 
 */
module.exports = (id, callback) => {
  try {
    return connectDb(db => deleteUser(db, id, callback));
  } catch (error) {
    return callback(error);
  }
};

const deleteUser = (db, id, callback) => {
  connectDb(db => {
    return db
      .collection('users')
      .deleteOne({ _id: new ObjectID(id) }, (err, result) => {
        return callback(err, result);
      });
  });
};
