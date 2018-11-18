const optionsConfigPathErrorMessage = 'options.configPath should be a string.';
const optionsIgnoreBrowserslistConfigErrorMessage = 'options.ignoreBrowserslistConfig should be a boolean.';
const optionsPolyfillsErrorMessage = 'oprions.polyfills should be array.';
const variableImportErrorMessage = (
  'You shouldn\'t import any variables from core-js module.'
  + '\n'
  + 'Use "import \'core-js\'" instead.'
);

const getBuiltInNameErrorMessage = builtInName => `${builtInName} doesn't exists in core-js.`;

module.exports = {
  variableImportErrorMessage,
  optionsConfigPathErrorMessage,
  optionsIgnoreBrowserslistConfigErrorMessage,
  optionsPolyfillsErrorMessage,

  getBuiltInNameErrorMessage,
};
