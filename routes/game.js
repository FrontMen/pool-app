var express = require('express');
var router = express.Router();

const connectDb = require('../lib/connectDb');

const playGame = require('../functions/playGame');

router.post('/', (req, res, next) => {
  playGame(req.body, (err, data) => {
    res.send(data);
    err && console.error(err);
  });
});

module.exports = router;
