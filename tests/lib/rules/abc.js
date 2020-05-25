// https://eslint.org/docs/developer-guide/nodejs-api#ruletester

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/abc');

// https://stackoverflow.com/questions/42706584/eslint-error-parsing-error-the-keyword-const-is-reserved
const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2017,
  },
});

ruleTester.run('abc', rule, {
  valid: [
    {
      code: 'const abc = 1;',
    }
  ],
  invalid: [
    {
      code: 'const xyz = 2;',
      errors: [
        { message: 'xyz' },
      ]
    }
  ],
});
