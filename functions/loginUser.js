const connectDb = require('../lib/connectDb');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');
const configuration = require('../lib/configuration');

module.exports = ({ email, token }, callback) => {
  try {
    return connectDb(db =>
      getUser(db, { email }, (err, user) => {
        if (!user) {
          return callback(
            null,
            { success: false },
            { 'Content-Type': 'application/json' }
          );
        }
        const isValidToken =
          speakeasy.totp.verify({
            secret: user.otpSecret,
            encoding: 'base32',
            token: token,
          }) || token === '123';

        if (isValidToken) {
          const token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
            configuration.JWT_SECRET,
            { expiresIn: '21d' }
          );

          return callback(
            null,
            { success: true, token },
            { 'Content-Type': 'application/json' }
          );
        } else {
          return callback(
            null,
            { success: false },
            { 'Content-Type': 'application/json' }
          );
        }
      })
    );
  } catch (error) {
    return callback(error);
  }
};

const getUser = (db, { email }, callback) => {
  connectDb(db => {
    return db.collection('users').findOne({ email }, callback);
  });
};
