const inquirer = require('inquirer');

// * ----------------------------------------------------------------

exports.thePublishQuest = async () => {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'publish',
        message: 'Would be published to npm?',
        choices: [
          { value: true, short: 'yes', name: `Yes` },
          { value: false, short: 'no', name: `Never publish` },
        ],
      },
    ])
    .then(({ publish }) => publish);
};
