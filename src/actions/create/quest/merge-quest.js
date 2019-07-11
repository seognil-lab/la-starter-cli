const inquirer = require('inquirer');

const { ck } = require('../../../utils/log');

// * ----------------------------------------------------------------

exports.theMergeQuest = async () => {
  const choices = [
    ['Overwrite', '(move original to trash bin)'],
    // ['Merge', '(keep original and replace)'],
    ['Abort'],
  ].map(([name, after]) => ({
    value: name,
    short: name,
    name: name + (after ? ` ${ck.grey(after)}` : ''),
  }));

  const { mergeAction } = await inquirer.prompt([
    {
      name: 'mergeAction',
      type: 'list',
      message: `Target directory already exists. Pick an action:`,
      choices,
    },
  ]);

  return mergeAction;
};
