const fs = require('fs');
const https = require('https');
const path = require('path');

const downloadGitRepo = require('download-git-repo');

// * ---------------------------------------------------------------- templates

const templates = {
  app: `seognil-lab/webpack-starter`,
  package: `seognil-lab/lib-starter`,
  readme: `https://gist.githubusercontent.com/PurpleBooth/109311bb0361f32d87a2/raw/8254b53ab8dcb18afc64287aaddd9e5b6059f880/README-Template.md`,
};

// * ---------------------------------------------------------------- downFile Wrapper

const downFile = async (url, dest) =>
  new Promise((res, rej) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, response => {
        response.pipe(file);
        file.on('finish', () => file.close(res));
      })
      .on('error', err => {
        fs.unlink(dest);
        rej(err);
      });
  });

// * ---------------------------------------------------------------- main

exports.downRepo = async (fullDest, type) =>
  new Promise((res, rej) => {
    downloadGitRepo(templates[type], fullDest, err => (err ? rej(err) : res()));
  });

exports.downReadme = async fullDest =>
  downFile(templates.readme, path.resolve(fullDest, 'readme.md'));
