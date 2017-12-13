const connectDb = require('../src/connectDb');

module.exports = (callback) => {
  try {
    return getUsers(callback);
  } catch (error) {
    return callback(error);
  }
};

const getUsers = callback => {
  connectDb(db => {
    return (err, docs) => {
      if (err) throw new Error(err);
      return db.collection('users').find().toArray((err, docs) => {
        return callback(err, docs);
      });
    };
  });
};
