const fuzzy = require('fuzzy');
const inquirer = require('inquirer');
const inquirerAutocomplete = require('inquirer-autocomplete-prompt');

inquirer.registerPrompt('autocomplete', inquirerAutocomplete);

// * ----------------------------------------------------------------

const licenseCmdMap = {
  'AGPL-3.0-or-later': 'agpl',
  'Apache-2.0': 'apache',
  'Artistic-2.0': 'artistic',
  'BSD-3-Clause': 'bsd-3-clause',
  'BSD-2-Clause': 'bsd',
  'CC0-1.0': 'cc0',
  'EPL-1.0': 'eclipse',
  'GPL-3.0-or-later': 'gpl-v3',
  'ISC': 'isc',
  'LGPL-3.0-or-later': 'lgpl-v3',
  'MIT': 'mit',
  'MPL-2.0': 'mozilla',
  'Unlicense': 'unlicense',
  'WTFPL': 'wtfpl',
};

const licenseList = Object.keys(licenseCmdMap);

// * ----------------------------------------------------------------

exports.theLicenseQuest = () =>
  inquirer.prompt([
    {
      name: 'license',
      type: 'autocomplete',
      message: 'Pick a SPDX License',
      source: (answers, input = '') =>
        new Promise(res => res(fuzzy.filter(input, licenseList).map(e => e.original))),
    },
  ]);

exports.genLicenseCmd = (license, author) => [
  'npx',
  'license-generator',
  'install',
  licenseCmdMap[license],
  '-n',
  author,
];
