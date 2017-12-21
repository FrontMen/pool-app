//@ts-check
const debug = require('debug')('app:configuration');


module.exports = {
  MONGO_URI: process.env['MONGO_URI'],
  JWT_SECRET: process.env['JWT_SECRET'],
  STDLIB_LIBRARY_TOKEN: process.env['STDLIB_LIBRARY_TOKEN'],
};
