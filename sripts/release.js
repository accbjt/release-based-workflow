const version = require('../package.json').version;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function createTag() {
  const setTag = await exec(`git tag v${version}-${process.env.PACKAGE}`);

  console.log('stdout:', setTag.stdout);
  console.log('stderr:', setTag.stderr);

  const pushTag = await exec('git push origin --tags');

  console.log('stdout:' pushTag.stdout);
  console.log('stdout:' pushTag.stderr);
}

createTag();

