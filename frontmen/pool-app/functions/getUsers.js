const connectDb = require('../lib/connectDb');

module.exports = (callback) => {
  try {
    return connectDb(db => getUsers(db, callback));
  } catch (error) {
    return callback(error);
  }
};

const getUsers = (db, callback) => {
  connectDb(db => {
    return db.collection('users').find().toArray((err, docs) => {
      return callback(err, docs);
    });
  });
};