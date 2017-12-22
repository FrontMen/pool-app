const ObjectID = require('mongodb').ObjectID;
const connectDb = require('../lib/connectDb');

module.exports = ({ id }, cb) =>
  connectDb(db => {
    return db.collection('users').findOne({ _id: new ObjectID(id) }, cb);
  });
