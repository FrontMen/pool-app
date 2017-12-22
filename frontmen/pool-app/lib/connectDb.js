const MongoClient = require('mongodb').MongoClient;
const debug = require('debug')('mongo:connect');

let cache;

module.exports = cb => {
  let uri = process.env['MONGO_URI'];
  debug('connectiong to mongo db on; %s', uri);
  if (!cache) {
    MongoClient.connect(uri, (error, client) => {
      if (error) {
        console.log(error['errors']);
        throw error;
      }
      cache = client.db('pool-app');
      return cb(cache);
    });
  } else {
    debug('Already connected serving from cache');
    return cb(cache);
  }
};
