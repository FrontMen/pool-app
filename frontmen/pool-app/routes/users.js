var express = require('express');
var router = express.Router();

const connectDb = require('../lib/connectDb');

const getUser = require('../functions/getUser');
const getUsers = require('../functions/getUsers');
const createUser = require('../functions/createUser');
const updateUser = require('../functions/updateUser');

/* GET users listing. */
router.get('/', (req, res, next) => {
  getUsers((err, docs) => {
    res.send(docs);
    err && console.error(err);
  });
});

router.get('/:id', (req, res, next) => {
  getUser({ id: req.params.id }, (err, docs) => {
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

router.post('/:id', (req, res, next) => {
  updateUser({ id: req.params.id, update: req.body }, (err, data) => {
    res.send(data);
    err && console.error(err);
  });
});

module.exports = router;
