#!/usr/bin/env node

const program = require('commander');

const pjson = require('../package.json');
const create = require('./actions/create');

// * ----------------------------------------------------------------  const

const {
  name,
  version: localVer,
  publishConfig: { registry },
  bin,
} = pjson;

const cliCmdName = Object.keys(bin)[0];

const { fancyLOGO, fancyTitle } = require('./utils/basic');
const { ck, log } = require('./utils/log');

// * ---------------------------------------------------------------- version

const fancyVersion = [fancyLOGO, fancyTitle].join('\n');

program.version(fancyVersion, '-v, --version');

// * ---------------------------------------------------------------- help

// * use dynamic action, not needed anymore
// program.command('*').action(() => program.help());

const descs = [
  [`create <project-name>`, `Create an App or a Package`, `create ${ck.ul`project-name`}`],
];

const len1 = Math.max(...descs.map(([e]) => e.length));

const logHelpVerbose = () =>
  log(
    '',
    'Commands:',
    descs.map(([c, d]) => `  ${c.padEnd(len1, '')}  ${ck.desc(d)}`),
    '',
    'Examples:',
    descs.map(([, , e]) => ck.cmd(`${cliCmdName} ${e}`)),
  );

program.on('--help', e => {
  logHelpVerbose();
});

// * ---------------------------------------------------------------- actions

const actions = {
  create,
};

// * ---------------------------------------------------------------- cli main

program
  .usage('<command> [options]')
  .arguments('<command> [options]')
  .action((command, ...options) => {
    if (['version', 'ver'].includes(command)) {
      log(fancyVersion);
      process.exit();
    }

    if (command === 'help') program.help();

    const action = actions[command];
    if (action) {
      action(...options);
    } else {
      program.outputHelp();
      log('', `${ck.red(`Wrong argument`)} ${ck.yellow(`<command>`)}`);
      process.exit();
    }
  });

// * ---------------------------------------------------------------- commander start

program.parse(process.argv);

if (program.args.length === 0) program.help();
