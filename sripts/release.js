const version = require('../package.json').version;
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fetch = require('node-fetch');

async function createTag() {
  try {
    const setTag = await exec(`git tag v${version}-${process.env.PACKAGE}`);
    debugger
    console.log('stdout:', setTag.stdout);
  } catch (err) {
    console.log(err.message, `\nThis is most likely because you didn't bump your version number.`);
    return;
  }

  try {
    const pushTag = await exec('git push origin --tags');
    console.log('stdout:', pushTag.stdout);
  } catch (err) {
    console.log(err.message);
    return;
  }
  
  try {
    const payload = {
      tag_name: `v${version}-formation-react`,
      name: `v${version}`,
      body: `Formation react release version v${version}`,
      draft: false,
      prerelease: false,
    }

    const response = await fetch(
      `https://api.github.com/repos/accbjt/release-based-workflow/releases?access_token=${process.env.GITHUB_API_KEY}`,
      {
        method: 'post',
        body: JSON.stringify(payload)
      }
    );

    const responseJson = await response.json();
    console.log(`v${version}-formation-react release has been created. ${response.url}`);
  } catch (err) {
    debugger
    console.log(err.message);
    return;
  }
  
}

createTag();

