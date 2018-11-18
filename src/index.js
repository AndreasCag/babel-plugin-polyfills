const processOptions = require('./processOptions');
const insertPolyfills = require('./insertPolyfills');
const variableImportErrorMessage = require('./data/errorMessages');

module.exports = ({ types }, options) => {
  const processedOptions = processOptions(options);

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;

        if (node.source.value !== 'core-js') {
          return;
        }

        if (node.specifiers.length !== 0) {
          throw path.buildCodeFrameError(variableImportErrorMessage);
        }

        insertPolyfills(types, path, processedOptions);
        path.remove();
      },
    },
  };
};
