const connectDb = require('../lib/connectDb');
// return error, docs
module.exports = cb =>
  connectDb(db => db.collection('users').find().toArray(cb));
