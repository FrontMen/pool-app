var express = require('express');
var router = express.Router();
const connectDb = require('../lib/connectDb');
const authenticate = require('../functions/loginUser');

router.post('/', (req, res, next) => {
  authenticate(req.body, (err, data) => {
    res.send(data);
    err && console.error(err);
  });
});

router.get('/', (req, res, next) => {
  authenticate(req.query, (err, data) => {
    res.send(data);
    err && console.error(err);
  });
});
module.exports = router;
