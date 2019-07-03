const inquirer = require('inquirer');

// * ----------------------------------------------------------------

exports.theBasicQuest = async xxpm =>
  inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: 'Choose the type of you work:',
      choices: [
        { value: 'app', short: 'App', name: `App` },
        { value: 'package', short: 'Package', name: `Package` },
      ],
    },
    {
      name: 'npmAutoInit',
      type: 'list',
      message: `Run '${xxpm} init' with default options?`,
      choices: [
        { value: true, short: 'yes', name: `Default` },
        { value: false, short: 'no', name: `Manually config` },
      ],
    },
  ]);
