const fs = require('fs');
const path = require('path');

const { sync: commandExistsSync } = require('command-exists');
const trash = require('trash');
const program = require('commander');
const shell = require('shelljs');

// * ---------------- const

const useYarn = commandExistsSync('yarn');
const xxpm = useYarn ? 'yarn' : 'npm';

// * -------------------------------- src

// * ---------------- quests

const { theMergeQuest } = require('./quest/merge-quest');
const { theBasicQuest } = require('./quest/basic-quest');
const { theNpmQuest, genNpmConfig } = require('./quest/npm-quest');
const { thePublishQuest } = require('./quest/publish-quest');
const { theLicenseQuest, genLicenseCmd } = require('./quest/license-quest');

// * ---------------- some of actions

const { downRepo, downReadme } = require('./action/download');
const { modJson } = require('./action/mod-json');

// * ---------------- units

const { fancyTitle } = require('../../utils/basic');
const { ck, log, consoleClear } = require('../../utils/log');
const { extend } = require('../../utils/tools');
const { execWrapper } = require('../../utils/exec');
const { runSpinner } = require('../../utils/run-spinner');

// * ================================================================================ main

const create = async (...params) => {
  // * ---------------- params empty check

  const dest = params[0];

  if (!dest) {
    program.outputHelp();

    log('', `${ck.red(`Argument needed`)} ${ck.yellow(`<project-name>`)}`);

    process.exit();
  }

  // * ---------------- prepare path const

  const fullDest = path.resolve(dest);
  const projName = path.basename(fullDest);

  const packagePath = path.resolve(fullDest, 'package.json');
  const readmePath = path.resolve(fullDest, 'readme.md');

  const colorFullDest = ck.cyan(fullDest);

  // * ---------------- helper fn

  const destExec = (cmd, stdio) => execWrapper(cmd, stdio, fullDest);

  // * ---------------------------------------------------------------- run

  // * ---------------- clear console

  await consoleClear();
  log(fancyTitle);
  log(ck.bb(`Creating project at ${colorFullDest}`), '');

  // * -------------------------------- quest

  // * ---------------- merge quest

  const shouldGitInit = false;
  let shouldDelete = false;

  if (fs.existsSync(fullDest)) {
    const mergeAction = await theMergeQuest(fullDest);

    if (mergeAction === 'Cancel') process.exit();

    if (mergeAction === 'Overwrite') {
      shouldDelete = true;

      log(`${ck.bb.red(`Trashing`)} ${colorFullDest}`, '');
    }
  }

  // * ---------------- basic quest

  const [basicAnswers, npmConfig] = await Promise.all([
    theBasicQuest(xxpm),
    genNpmConfig(projName),
    shouldDelete && trash(fullDest),
  ]);

  // * ---------------- config quest

  const { type, npmAutoInit } = basicAnswers;
  extend(npmConfig, { name: projName });

  let willPublish = type === 'package';

  if (!npmAutoInit) {
    log();

    const npmUserConfigs = await theNpmQuest(npmConfig);
    const userWillPublish = await thePublishQuest(type);
    const license = await theLicenseQuest();

    willPublish = userWillPublish;

    // * merge config from answers
    extend(npmConfig, npmUserConfigs, license);
  }

  log();

  // * -------------------------------- action

  // * ---------------- create files

  // * download repo
  await runSpinner('⬇️  Downloading boilerplate code ...', async () => {
    if (!fs.existsSync(fullDest)) await shell.mkdir(`-p`, `${fullDest}`);

    await downRepo(fullDest, type);
    // .catch(err => log('Download failed, try again...'));
  });

  // * generate readme and license
  await runSpinner('📄  Downloading Readme template', async () => {
    const { license, author } = npmConfig;
    await Promise.all([downReadme(fullDest), destExec(genLicenseCmd(license, author))]);
  });

  // * modify
  await runSpinner('⚙️  Apply Settings', async () => {
    await Promise.all([
      shell.sed('-i', '# Project Title', `# Project ${projName}`, readmePath),
      modJson(packagePath, npmConfig, willPublish),
    ]);
  });

  // * ---------------- npm install

  {
    log();
    const cmd = useYarn ? 'yarn' : 'npm install --loglevel error';
    await destExec(cmd, true);
  }

  // * ---------------- git

  if (shouldGitInit) {
    log('', `🗃  Initializing git repository...`);
    await destExec(`git init`);
    await destExec(`git add --all`);
    await destExec([`git`, `commit`, `-m`, `feat(init): init project from boilerplate`]);
  }

  // * -------------------------------- log scripts

  {
    log(
      '',
      `🎉  Successfully created project ${ck.yellow(projName)}.`,
      `👉  Get started with the following commands:`,
      '',
    );

    log(ck.cmd(`cd ${ck.ul(dest)}`));

    log();

    const cmdHelp = (type === 'app'
      ? [`start`, `build`, `format`, `analyze ${ck.grey(`(after build)`)}`]
      : [`test:watch`, `build`, `format`]
    )
      .map(c => `${xxpm} ${c}`)
      .map(ck.cmd);

    log(cmdHelp);

    log();

    log(
      `${ck.bb`Don't forget`} to update ${ck.ul`readme.md`} and ${ck.ul`package.json`} of your project.`,
    );
  }
};

// * ================================================================================ output

module.exports = create;
