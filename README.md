### eslint-plugin-example

eslint plugin 的一个例子。

### 1. 编写 plugin
#### 1.1 yeoman 脚手架
参考：https://eslint.org/docs/developer-guide/working-with-plugins#create-a-plugin

```
$ npm i -g yo
$ npm i -g generator-eslint
```

```
$ cd eslint-plugin-example
$ yo eslint:plugin
```

#### 1.2 更新依赖
```
{
  ...,
  "dependencies": {
    "requireindex": "^1.2.0"
  },
  "devDependencies": {
    "eslint": "^7.1.0",
    "mocha": "^7.2.0"
  },
}
```

#### 1.3 编写 rule：lib/rules/abc.js
参考：https://eslint.org/docs/developer-guide/working-with-rules
```
module.exports = {
  meta: {
    type: ...,

    docs: {
      description: ...,
      category: ...,
      recommended: ...,
      url: ...,
    },
    fixable: ...,
    schema: ...,
  },
  create: function (context) {
    ...,
  }
};
```

#### 1.4 编写 test：tests/lib/rules/abc.js
参考：https://eslint.org/docs/developer-guide/nodejs-api#ruletester
```
const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/abc');

const ruleTester = new RuleTester(...);

ruleTester.run('abc', rule, {
  valid: [
    {
      code: ...,
    }
  ],
  invalid: [
    {
      code: ...,
      errors: [
        { message: ... },
      ]
    }
  ],
});
```

#### 1.5 VSCode debug 配置：.vscode/launch.json
参考：https://github.com/Microsoft/vscode-recipes/tree/master/debugging-mocha-tests
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": [
        "tests",
        "--recursive"
      ]
    }
  ]
}
```

### 2. 使用 plugin

#### 2.1 新建工程
```
$ cd use-eslint-plugin
$ npm init -f
$ npm i -D eslint
```

#### 2.2 新建 eslint 配置文件：.eslintrc.json
参考：https://eslint.org/docs/user-guide/configuring#configuring-plugins
```
{
  "parserOptions": {
    "ecmaVersion": 2017
  },
  "plugins": [
    "example"
  ],
  "rules": {
    "example/abc": "error"
  }
}
```
设置 `plugins` 为 `example`，会自动加载 `eslint-plugin-example` 模块。  
`rules` 设置为 `example/abc`，指的是配置 `eslint-plugin-example` 插件的 `abc` 规则。

#### 2.3 配置 package.json 中的 npm scripts
参考：https://eslint.org/docs/user-guide/getting-started#installation-and-usage
```
{
  ...,
  "scripts": {
    "lint": "eslint index.js",
  }
}
```

#### （4）使用 eslint 进行检查的文件 index.js
```
const xyz = 2;
```

#### （5）执行检查
```
$ npm run lint

> use-eslint-plugin@1.0.0 lint /Users/.../Downloads/use-eslint-plugin
> eslint index.js


/Users/.../use-eslint-plugin/index.js
  1:7  error  xyz  example/abc

✖ 1 problem (1 error, 0 warnings)
```

- - -

### 备注
本例中 `eslint-plugin-example` 尚未发布到 npm，可以使用其他 eslint plugin 进行测试。  
  
方法如下：  

（1）安装 `eslint-plugin-react`  
```
$ npm i eslint-plugin-react
```

（2）修改 .eslintrc.json 中的 plugin 名字，从 `example` 改成 `react`
```
{
  ...,
  "plugins": [
    "react"
  ],
  "rules": {
    "react/abc": "error"
  }
}
```

（3）修改安装后插件的 package.json 的 main 字段  
node_modules/_eslint-plugin-react@7.20.0@eslint-plugin-react/package.json
```
{
  "main": "/.../eslint-plugin-example/lib/index.js",
}
```
指向本地的 `eslint-plugin-example/lib/index.js` 绝对路径就行了。

- - -

### 参考
[Yeoman: generator-eslint](https://www.npmjs.com/package/generator-eslint)  
[ESLint: Working with Plugins](https://eslint.org/docs/developer-guide/working-with-plugins)  
[ESLint: RuleTester](https://eslint.org/docs/developer-guide/nodejs-api#ruletester)  
[ESLint: Installation and Usage](https://eslint.org/docs/user-guide/getting-started#installation-and-usage)  
[ESLint: Configuring Plugins](https://eslint.org/docs/user-guide/configuring#configuring-plugins)  
[Debugging tests in VS Code](https://github.com/Microsoft/vscode-recipes/tree/master/debugging-mocha-tests)