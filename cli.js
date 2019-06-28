#!/usr/bin/env node

const commandExistsSync = require('command-exists').sync;

const inquirer = require('inquirer');

inquirer
  .prompt([
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });

const useYarn = commandExistsSync('yarn');

console.warn('lcdebug 06-28 124912', '', useYarn);
