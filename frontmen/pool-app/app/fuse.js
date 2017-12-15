const { FuseBox } = require('fuse-box');
// const TypeHelper = require('fuse-box-typechecker').TypeHelper;

// const typeHelper = TypeHelper({
//   tsConfig: './tsconfig.json',
//   basePath: './',
//   // tsLint:'./tslint.json', //you do not haveto do tslint too.. just here to show how.
//   name: 'TS typechecker',
// });

const NODE_ENV = process.env.NODE_ENV || 'development';
const isTest = NODE_ENV === 'test';
const isProduction = NODE_ENV === 'production';

const fuse = FuseBox.init({
  homeDir: 'src',
  output: '../static/$name.js',
  standalone: true,
  // sourceMaps: !isProduction,
});

let fuseChain = fuse
  .bundle('main')
  .target('browser')
  .instructions(`> src/index.ts`);

if (!isProduction) {
  // fuseChain = fuseChain.hmr({
  //   reload: true,
  //   socketURI: `ws://localhost:${3000}`,
  // });
  // fuseChain.watch('src/**').completed(proc => {
  //   console.log('\x1b[36m%s\x1b[0m', 'client bundled');
  //   // run the type checking
  //   typeHelper.runSync();
  // });
  // fuse.dev({
  //   open: true,
  //   root: './',
  //   port: 3000,
  // });
}

fuse.run();
