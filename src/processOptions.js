const { isBrowsersQueryValid } = require('@babel/preset-env/lib/targets-parser');
const { default: getTargets } = require('@babel/preset-env/lib/targets-parser');
const {
  optionsConfigPathErrorMessage,
  optionsIgnoreBrowserslistConfigErrorMessage,
  optionsPolyfillsErrorMessage,
} = require('./data/errorMessages');

const fillEmptyProps = (options) => {
  if (!options.hasOwnProperty('targets')) {
    options.targets = {};
  }

  if (!options.hasOwnProperty('configPath')) {
    options.configPath = process.cwd();
  }

  if (!options.hasOwnProperty('ignoreBrowserslistConfig')) {
    options.ignoreBrowserslistConfig = false;
  }
};

const validateProps = (options) => {
  // targets will be validated in @babel/preset-env

  if (typeof options.configPath !== 'string') {
    throw new Error(optionsConfigPathErrorMessage);
  }

  if (typeof options.ignoreBrowserslistConfig !== 'boolean') {
    throw new Error(optionsIgnoreBrowserslistConfigErrorMessage);
  }

  if (options.hasOwnProperty('polyfills') && !Array.isArray(options.polyfills)) {
    throw new Error(optionsPolyfillsErrorMessage);
  }
};

const processTargets = (options) => {
  if (isBrowsersQueryValid(options.targets)) {
    options.targets = {
      browsers: options.targets,
    };
  }

  const processedTargets = getTargets(options.targets, {
    ignoreBrowserslistConfig: options.ignoreBrowserslistConfig,
    configPath: options.configPath,
  });

  options.targets = processedTargets;
};

module.exports = (options = {}) => {
  fillEmptyProps(options);
  validateProps(options);
  processTargets(options);

  return options;
};
