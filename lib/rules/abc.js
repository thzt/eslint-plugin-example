// https://eslint.org/docs/developer-guide/working-with-rules
module.exports = {
  meta: {
    type: 'suggestion',

    docs: {
      description: 'Variable name can only be "abc"',
      category: 'category',
      recommended: true,
      url: 'url'
    },
    fixable: 'code',
    schema: [],
  },

  create: function (context) {
    // https://eslint.org/docs/developer-guide/working-with-rules#the-context-object

    return {

      // 查找所有的变量定义
      // https://eslint.org/docs/developer-guide/selectors
      ['VariableDeclaration Identifier'](node) {
        if (node.name === 'abc') {
          return;
        }

        // 变量名如果不是 "abc"，就报错
        context.report({
          node,
          message: node.name,
        });
      }
    };
  }
};