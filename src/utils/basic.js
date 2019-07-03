const path = require('path');

const chalk = require('chalk');
const { default: Printer } = require('@darkobits/lolcatjs');

// * app-root-path,their bug
// const { path: appRoot } = require('app-root-path');
// const { version: localVer } = require(path.resolve(appRoot, './package.json'));

const { version: localVer } = require('../../package.json');

// * ----------------------------------------------------------------

const LOGO = String.raw`
  ╦   ╔═╗ ╦   ╦  
  ║   ║   ║   ║  
  ╩═╝ ╚═╝ ╩═╝ ╩  
`;

// * ----------------------------------------------------------------

exports.fancyLOGO = chalk.dim(
  Printer.fromString(LOGO, {
    seed: 1241.3992803854546,
    spread: 4,
    freq: 0.5,
  }),
);

exports.fancyTitle = chalk.hsl(140, 70, 50).bold.italic(`La Starter CLI v${localVer}`);
