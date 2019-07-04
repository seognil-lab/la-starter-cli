const inquirer = require('inquirer');
const gitconfig = require('gitconfig');
const npmConf = require('npm-conf');

const { ck } = require('../../../utils/log');
const { extend } = require('../../../utils/tools');

// * ----------------------------------------------------------------

const getGitName = hasGit =>
  hasGit && gitconfig.get({ location: 'global' }).then(config => config.user && config.user.name);

// * ----------------------------------------------------------------

exports.genNpmConfig = async (projName, hasGit) => {
  const conf = npmConf();

  const author = conf.get('init-author-name') || (await getGitName(hasGit)) || 'your-name';

  const npmConfig = {
    name: projName,
    version: conf.get('init-version') || `0.0.0`,
    main: 'src/index.js',
    description: '',
    license: conf.get('init-license') || 'MIT',
    author,
    repository: `${author}/${projName}`,
  };

  return npmConfig;
};

exports.theNpmQuest = async npmConfig => {
  const quest = [
    { name: 'name', message: `name` },
    { name: 'version', message: `version` },
    { name: 'main', message: 'entry point' },
    { name: 'description', message: 'description' },
    { name: 'repository', message: 'repository' },
    { name: 'author', message: 'author' },

    // * config separated
    // { name: 'license', message: 'license' },
  ].map(e => {
    extend(e, { type: 'input', prefix: ck.grey`package` });

    const def = npmConfig[e.name];
    if (def) extend(e, { default: def });

    return e;
  });

  return inquirer.prompt(quest);
};
