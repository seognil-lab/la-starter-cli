const ora = require('ora');

// * ----------------------------------------------------------------

exports.runSpinner = async (text, fn) => {
  const spinner = ora();
  spinner.text = text;
  spinner.start();

  await fn();

  spinner.succeed();
};
