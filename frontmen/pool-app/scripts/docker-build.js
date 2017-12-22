const version = 'dev';
const tag = 'alber70g/frontmen-pool-app';
const { myExec } = require('./util');

myExec(`docker build -t ${tag}:${version} .`);
