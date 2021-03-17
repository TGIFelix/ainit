const path = require('path');
const inquirer = require('inquirer');

const baseConfig = {
  builds: [{
    src: 'src/index.js',
    use: '@now/node-server',
  }],
  routes: [{
    src: '/.*',
    dest: 'src/index.js',
  }],
};

async function nodeJS(config) {
  let mainFile = 'src/index.js';
  try {
    // eslint-disable-next-line
    const packagaJSON = require(path.join(process.cwd(), 'package.json'));
    mainFile = packagaJSON.main;
    // eslint-disable-next-line
  } catch (error) {}

  const answer = await inquirer
    .prompt([
      {
        type: 'text',
        name: 'main',
        message: 'what is your entry path?',
        default: mainFile,
      },
    ]);
    // eslint-disable-next-line no-console
  console.log(answer);
  return {
    ...config,
    ...baseConfig,
  };
}

module.exports = nodeJS;
