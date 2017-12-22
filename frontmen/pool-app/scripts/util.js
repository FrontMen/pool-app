const { exec } = require('child_process');

module.exports = {
  myExec: command => {
    const process = exec(command);

    process.stdout.on('data', data => {
      console.log('stdout: ' + data.toString());
    });

    process.stderr.on('data', data => {
      console.log('stderr: ' + data.toString());
    });

    process.on('exit', code => {
      console.log('child process exited with code ' + code.toString());
    });
  },
};
