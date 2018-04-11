const jwt = require('jsonwebtoken');
const config = require('../lib/configuration');

module.exports = token => {
  try {
    return jwt.verify(token, config.JWT_SECRET);
  } catch (error) {
    throw Error('unauthorized');
  }
};
