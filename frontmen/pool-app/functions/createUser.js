const MongoClient = require('mongodb').MongoClient;
const lib = require('lib');
const connectDb = require('../lib/connectDb');
const speakeasy = require('speakeasy');

const allowedDomains = ['frontmen.nl', 'jpoint.nl', 'detesters.nl'];

/**
 * @returns {any}
 */
module.exports = ({ name, email }, callback) => {
  if (!name || !email) {
    return callback('', 'Cannot Register; missing parameters');
  }
  const domain = email.split('@')[1];
  if (allowedDomains.indexOf(domain) === -1) {
    return callback('', 'Cannot Register; you work for the wrong company!');
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

  return connectDb(db => createUser(db, { user, secret }, callback));
};

const createUser = (db, { user, secret }, callback) => {
  // db.collection('users').createIndex({ name: 1 }, { unique: true });
  db.collection('users').insertOne(user, (error, result) => {
    if (error) {
      console.log(error);
      return callback(null, error);
    }
    sendCreateUserEmail({ email: user.email, secret });
    return callback(null, result.insertedId);
  });
};

const sendCreateUserEmail = ({ email, secret }) => {
  // QRCode.toDataURL(secret.otpauth_url, function(err, data_url) {
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
          <img src="https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(
            secret.otpauth_url
          )}" /> <br />
          Token: <a href="${secret.otpauth_url}">${secret.base32}</a> <br />
          Succes! <br />
          <br />
          De groe(n)ten, <br />
          Pool FrontMeisters
        </p>
      </body>
      </html>`;

  sendMailFn({ from, to, subject, html }, (err, result) => {
    if (err) {
      throw Error(err);
    }
  });
};
