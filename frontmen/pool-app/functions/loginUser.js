const connectDb = require('../lib/connectDb');
const speakeasy = require('speakeasy');
const jwt = require('jsonwebtoken');

/**
 * @param {string} email 
 * @param {string} token 
 */
module.exports = (email, token, context, callback) => {
  try {
    return connectDb(db =>
      getUser(db, email, (err, user) => {
        const isValidToken = speakeasy.totp.verify({
          secret: user.otpSecret,
          encoding: 'base32',
          token: token,
        });

        if (isValidToken) {
          const token = jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
            process.env['JWT_SECRET'],
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

const getUser = (db, email, callback) => {
  connectDb(db => {
    return db.collection('users').findOne({ email: email }, callback);
  });
};
