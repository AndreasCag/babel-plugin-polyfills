module.exports = (arr, func) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    const result = func(item);

    if (result === false) {
      break;
    }
  }
};
