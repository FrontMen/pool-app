const MongoClient = require('mongodb').MongoClient;
const configuration = require('../lib/configuration');

let cache;

module.exports = (cb) => {
  let uri = configuration.MONGO_URI;
  if (!cache) {
    MongoClient.connect(uri, (error, client) => {
      if (error) {
        console.log(error['errors']);
        throw Error(error);
      }
      cache = client.db('pool-app');
      return cb(cache);
    });
  } else {
    return cb(cache);
  }
};
