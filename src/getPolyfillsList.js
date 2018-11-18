const builtInsData = require('@babel/preset-env/data/built-ins.json');
const forEach = require('./helpers/forEach');
const { getBuiltInNameErrorMessage } = require('./data/errorMessages');

const defaultBuiltInsList = Object.keys(builtInsData);

module.exports = (targets, pickedBuiltIns) => {
  const targetsList = Object.keys(targets);
  const builtInsList = pickedBuiltIns || defaultBuiltInsList;

  // If no targets configuration found
  if (targetsList.length === 0) {
    return builtInsList;
  }

  const includedBuiltIns = [];

  builtInsList.forEach((builtInName) => {
    if (!builtInsData.hasOwnProperty(builtInName)) {
      throw new Error(getBuiltInNameErrorMessage(builtInName));
    }

    const builtInData = builtInsData[builtInName];
    let isRequired = false;

    // eslint-disable-next-line consistent-return
    forEach(targetsList, (targetName) => {
      if (!builtInData.hasOwnProperty(targetName)) {
        isRequired = true;

        return false;
      }

      const targetVersion = targets[targetName];
      const builtInMinTargetVersion = builtInData[targetName];

      if (targetVersion < builtInMinTargetVersion) {
        isRequired = true;

        return false;
      }
    });

    if (!isRequired) {
      return;
    }

    includedBuiltIns.push(builtInName);
  });

  return includedBuiltIns;
};
