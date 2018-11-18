/* globals test, expect */

const babel = require('@babel/core');
const polyfillsPlugin = require('../src/index.js');

test('it works', () => {
  const { code } = babel.transform(
    'import \'core-js\';',
    {
      // presets: [
      //   [
      //     '@babel/preset-env',
      //     {
      //       useBuiltIns: 'entry',
      //       targets: { chrome: '63' },
      //     },
      //   ],
      // ],
      plugins: [
        [polyfillsPlugin, {
          targets: '>0.25%',
        }],
      ],
    },
  );

  expect(code).toMatchSnapshot();
});
