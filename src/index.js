const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const svelteJS = require('./config/svelte.js');
const reactJS = require('./config/react.js');
const nodeJS = require('./config/node.js');

const existingConfig = fs.existsSync('test.json');

async function buildConfig() {
  let config = {
    version: 2,
  };

  const answers = await inquirer
    .prompt([
      {
        type: 'text',
        name: 'name',
        message: 'What will be the next big thing?',
        default: path.basename(process.cwd()),
      },
      {
        type: 'list',
        name: 'type',
        message: 'What Jam?',
        choices: [
          'sveltejs',
          'reactjs',
          'nodejs',
        ],
      },
    ]);
  config.name = answers.name;
  switch (answers.type) {
    case 'sveltejs':
      config = await svelteJS(config);
      break;
    case 'reactjs':
      config = await reactJS(config);
      break;
    case 'nodejs':
      config = await nodeJS(config);
      break;
    default:
      break;
  }
  console.log(config);
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'overwrite existing test.json?',
        default: true,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('👋😊');
      }
    });
} else {
  buildConfig();
}
