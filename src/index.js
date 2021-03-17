/* eslint-disable default-case */
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const svelte = require('./config/svelte.js');

const existingConfig = fs.existsSync('debug.json');

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
      config = await svelte(config);
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
        message: 'overwrite existing package.json?',
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('bye for now?');
      }
    });
} else {
  buildConfig();
}
