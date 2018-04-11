const sendmail = require('sendmail');

/**
 * Send mail 
 */
module.exports = ({ from, to, subject, html }, callback) => {
  sendmail()(
    {
      from,
      to,
      subject,
      html,
      headers: {
        'Content-Transfer-Encoding': 'quoted-printable',
      },
    },
    (err, reply) => {
      err
        ? callback(err, err.stack)
        : callback(
            null,
            `Send email '${subject}' to '${to}'. Reply '${reply}'`
          );
    }
  );
};
