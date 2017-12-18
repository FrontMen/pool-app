const jwt = require('jsonwebtoken');

module.exports = token => {
  try {
    return jwt.verify(token, process.env['JWT_SECRET']);
  } catch (error) {
    throw Error('unauthorized');
  }
};
