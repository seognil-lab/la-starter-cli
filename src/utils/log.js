const readline = require('readline');

const chalk = require('chalk');

// * ----------------------------------------------------------------

exports.ck = Object.assign(chalk, {
  ul: chalk.underline,
  bb: chalk.bold,
  cmd: cmd => `  ${chalk.grey('$')} ${chalk.cyan(cmd)}`,
  desc: cmd => `  ${chalk.grey('#')} ${chalk.grey(cmd)}`,
});

exports.log = (...args) => {
  console.log(
    args
      .map(e => (Array.isArray(e) ? e.join('\n') : e))
      .join('\n')
      .replace(/^(\n)+/, '\n')
      .replace(/[\n\s]+$/g, '\n'),
  );
};

exports.consoleClear = () => {
  if (!process.stdout.isTTY) return;

  console.log('\n'.repeat(process.stdout.rows));
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
};
