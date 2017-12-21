const MongoClient = require('mongodb').MongoClient;
const lib = require('lib');
const connectDb = require('../lib/connectDb');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

/**
 * @returns {any}
 */
module.exports = ({ name, email }, callback) => {
  if (!name || !email) {
    return callback('', 'Cannot Register');
  }

  if (email.indexOf('@frontmen.nl') === -1) {
    return callback('', 'Cannot Register');
  }

  const secret = speakeasy.generateSecret({
    name: `FrontMen Pool Cafe ${email}`,
    symbols: false,
    length: 8,
  });

  let user = {
    name: name,
    score: 1500,
    email,
    otpSecret: secret.base32,
  };

  return connectDb(db => createUser(db, user, secret, context, callback));
};

const createUser = (db, user, secret, context, callback) => {
  // db.collection('users').createIndex({ name: 1 }, { unique: true });
  db.collection('users').insertOne(user, (error, result) => {
    if (error) {
      console.log(error);
      return callback(null, error);
    }
    sendCreateUserEmail(user.email, secret, context);
    return callback(null, result.insertedId);
  });
};

const sendCreateUserEmail = (email, secret, context) => {
  QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
    // TODO: fix context.service.identifier for expressjs
    const sendMailFn = require('./sendMail');
    const from = 'pool-app@frontmen.nl';
    const to = email;
    const subject = 'FrontMen Pool Cafe';
    const html = `<html>
      <body>
        <p>
          Welkom in FrontMen Pool Cafe <br />
          <br />
          https://frontmen.stdlib.com/pool-app/
          De One Time Passcode voor Google Authenticator om in te loggen: <br />
          <img src="cid:imageblaat" /> <br />
          Token: <a href="${secret.otpauth_url}">${secret.base32}</a> <br />
          Succes! <br />
          <br />
          De groe(n)ten, <br />
          Pool FrontMeisters
        </p>
      </body>
      </html>`;

    sendMailFn({ from, to, subject, html, path: data_url }, (err, result) => {
      if (err) {
        throw Error(err);
      }
    });
  });
};
