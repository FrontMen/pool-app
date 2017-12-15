const MongoClient = require('mongodb').MongoClient;
const connectDb = require('../lib/connectDb');

let cacheDb = null;

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  let name = context.params.name;
  let email = context.params.email;

  if (!name || !email) {
    return callback({ message: 'Cannot Register' });
  }

  if (email.indexOf('@frontmen.nl') === -1) {
    return callback({ message: 'Cannot Register' });
  }

  let user = {
    name: name,
    score: 1500,
    email,
  };

  return connectDb(db => createUser(db, user, callback));
};

const createUser = (db, user, callback) => {
  // db.collection('users').createIndex({ name: 1 }, { unique: true });
  db.collection('users').insertOne(user, (error, result) => {
    if (error) {
      console.log(error);
      return callback(null, error);
    }
    return callback(null, result.insertedId);
  });
};
