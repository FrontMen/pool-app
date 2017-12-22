const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const hostname = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || 8170;

const app = express();
app.use(bodyParser.json());

app.use('/', express.static('static'));

// routes
app.use('/users', require('./routes/users'));
app.use('/authenticate', require('./routes/authentication'));
app.use('/game', require('./routes/game'));

const createEndpoint = pathName => {
  app.get(`/${pathName}`, (req, res, err) => {
    var fn = require(`./functions/${pathName}`);
    fn(req.query, (err, data) => {
      res.send(data);
      err && console.error(err);
    });
  });
};

['deleteAllUsers', 'deleteUser'].forEach(createEndpoint);

app.listen(port, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('==> ✅  Server is listening');
  console.info(`==> 🌎  Go to http://${hostname}:${port}`);
  console.info(`==> 🚀  Mongo connection; ${process.env.MONGO_URI}`);
});
