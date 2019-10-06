// const { exec } = require('child_process');
// exec('npm pack app/diffng_template/', (err, stdout, stderr) => {
//  if (err) {
    // node couldn't execute the command
//    return;
//  }
//
  // the *entire* stdout and stderr (buffered)
//  console.log(`stdout: ${stdout}`);
//  console.log(`stderr: ${stderr}`);
// });

const modID = module.id;
const modPack = require('./package.json');

exports.rnaStatus = function(){
    console.log('Environment config file(s) present.');
    return;
}

console.log(`[${modPack.name}]: loaded from ${modID}`);

