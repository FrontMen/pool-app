const MongoClient = require('mongodb').MongoClient;
const connectDb = require('../src/connectDb');

let cacheDb = null;

/**
* @returns {any}
*/
module.exports = (context, callback) => {
  let name = context.params.name;
  if (!name) {
    return callback('error');
  }

  let user = {
    name: name,
    score: 1500,
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
