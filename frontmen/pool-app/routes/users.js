var express = require('express');
var router = express.Router();

const connectDb = require('../lib/connectDb');

const getUsers = require('../functions/getUsers');
const createUser = require('../functions/createUser');

/* GET users listing. */
router.get('/', (req, res, next) => {
  getUsers((err, docs) => {
    res.send(docs);
    err && console.error(err);
  });
});

router.post('/', (req, res, next) => {
  createUser(req.body, (err, data) => {
    res.send(data);
    err && console.error(err);
  });
});

module.exports = router;
