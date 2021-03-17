const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const existingConfig = fs.existsSync('debug.json');

function buildConfig() {
  inquirer
    .prompt([
      {
        type: 'text',
        name: 'name',
        message: 'What will be the next big thing?',
        default: path.basename(process.cwd())
      },
      {
        type: 'list',
        name: 'type',
        message: 'What Jam?',
        choices: [
          'SvelteJS',
          'ReactJS',
          'NodeJS'
        ]
      }
    ])
    .then(answers => {
      console.log(answers);
    });
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'overwrite existing package.json?',
        default: false
      }
    ])
    .then(answers => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('bye for now?');
      }
    });
} else {
  buildConfig();
}
