const version = require('../package.json').version;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function ls() {
  const { stdout, stderr } = await exec('git status');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
ls();

