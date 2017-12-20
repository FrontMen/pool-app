//@ts-check
const debug = require('debug')('app:configuration');

const createMongoUri = () => {
  if (process.env.MONGO_PORT) {
    return `mongodb://mongodb:27017/pool-app`;
  }
};

module.exports = {
  MONGO_URI: createMongoUri() || process.env['MONGO_URI'],
  JWT_SECRET: process.env['JWT_SECRET'],
  STDLIB_LIBRARY_TOKEN: process.env['STDLIB_LIBRARY_TOKEN'],
};
