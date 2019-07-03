const jsonfile = require('jsonfile');

const { extend } = require('../../../utils/tools');

// * ----------------------------------------------------------------

exports.modJson = async (packagePath, npmConfig, willPublish) => {
  const tempJson = await jsonfile.readFile(packagePath);

  const orderedJson = [
    'name',
    'version',
    'main',
    'description',
    'license',
    'author',
    'repository',
  ].reduce((a, e) => extend(a, { [e]: npmConfig[e] }), {});

  extend(orderedJson, {
    publishConfig: {
      registry: willPublish ? 'https://registry.npmjs.org/' : 'https://prevent.push.to.registry/',
    },
    keywords: [],
    bugs: `https://github.com/${npmConfig.repository}/issues`,
    homepage: `https://github.com/${npmConfig.repository}`,
  });

  // * update and keep the order
  const newPJson = extend({}, orderedJson, tempJson, orderedJson);

  await jsonfile.writeFile(packagePath, newPJson, { spaces: 2 }, err => {});
};
