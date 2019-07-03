const execa = require('execa');

// * ----------------------------------------------------------------

exports.execWrapper = (cmd, stdio, cwd, params /* const holder */) => {
  [cmd, ...params] = Array.isArray(cmd) ? cmd : cmd.split(/\s+/);
  return execa(cmd, params, { cwd, stdio: stdio ? 'inherit' : undefined });
};
