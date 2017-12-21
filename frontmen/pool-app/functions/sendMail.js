const sendmail = require('sendmail');

/**
 * Send mail 
 */
module.exports = ({ from, to, subject, html }, context, callback) => {
  // const attachments = [{ path, cid: 'imageblaat' }];
  sendmail()(
    {
      from,
      to,
      subject,
      html,
      // attachments,
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
