const { addSideEffect } = require('@babel/helper-module-imports');
const getPolyfillsList = require('./getPolyfillsList');

module.exports = (types, path, options) => {
  const polyfillsList = getPolyfillsList(options.targets, options.polyfills);

  polyfillsList.forEach((polyfillName) => {
    const importPath = `core-js/modules/${polyfillName}`;

    addSideEffect(path, importPath);
  });
};
