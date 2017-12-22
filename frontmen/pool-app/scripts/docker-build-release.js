const version = require('../package.json').version;
const tag = 'registry.wieisalbert.nu/alber70g/frontmen-pool-app';
const { myExec } = require('./util');

myExec(`docker build -t ${tag}:${version} . && docker push ${tag}:${version}`);
