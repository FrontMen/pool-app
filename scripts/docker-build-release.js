const version = require('../package.json').version;
const tag = 'registry.wieisalbert.nu/alber70g/frontmen-pool-app';
const { myExec } = require('./util');

console.log(`Creating ${tag}:${version}...`)

myExec(`docker build -t ${tag}:${version} . && docker push ${tag}:${version}`);
