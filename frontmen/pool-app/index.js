const express = require('express');

const app = express();
const port = process.env.PORT || 8170;

let mongo_prod;
// mongo_prod = 'mongodb://mongodb:27017/pool-app';

const env = {
  MONGO_URI:
    mongo_prod ||
    'mongodb://poolapp:oM2GWZwaTvIZzC7x@poolapp-shard-00-00-jhvew.mongodb.net:27017,poolapp-shard-00-01-jhvew.mongodb.net:27017,poolapp-shard-00-02-jhvew.mongodb.net:27017/test?ssl=true&replicaSet=PoolApp-shard-0&authSource=admin',
  JWT_SECRET: 'bc0748a4-fa27-4689-8474-f0a3e37016c5',
  STDLIB_LIBRARY_TOKEN:
    'qyZ754PWW5CBhBG1ECJ6ITr_js14oYnGG8cCoXl2Uk8EvJdM9VuHSZjVG23-Upy9',
};

Object.assign(process.env, env);

app.use('/', express.static('static'));

app.get('/getUsers', (req, res, err) => {
  var fn = require('./functions/getUsers');
  fn((err, data) => {
    res.send(data);
    console.error(err);
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
