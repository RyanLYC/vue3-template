# vue3 企业级项目模板搭建

## 技术选型

- 构建工具 - vite
- 前端框架 - vue3
- 编程语言 - typescript
- 代码检测工具 - eslint
- 代码格式化工具 - prettier editorConfig 
- 规范代码提交工具 - husky、Commitizen、cz-customizable、 commitlint、lint-staged
- css 代码检测工具 - stylelint
- 编辑器 - vscode
- 包管理工具 - yarn

## 初始化项目

```
npm init vue@latest 
选择ts eslint prettier jsx
```

## 集成 EditorConfig 配置

`注意：`VSCode 使用 EditorConfig 需要去插件市场下载插件 EditorConfig for VS Code 。 JetBrains 系列（WebStorm、IntelliJ IDEA 等）则不用额外安装插件，可直接使用 EditorConfig 配置。

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。 官网：editorconfig.org 在项目根目录下增加  
.editorconfig 文件：
```shell
# Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

## 集成 eslint 和 prettier

我们需要先安装这两个 vscode 插件 ESlint 和 Prettier

- eslint：代码检测工具，检测代码的语法错误和潜在的 Bug，目的是保证团队之间代码一
  致性和避免错误
- prettier：代码格式化工具，用于检测代码中的格式问题，比如单行代码长度、tab 长度
  、空格、逗号表达式等
- 区别和联系：eslint 偏向于把控代码的代码质量，prettier 偏向于统一项目的编码风格
  ，eslint 也有小部分代码格式化功能，一般和 prettier 结合使用
- eslint-import-resolver-typescript - 让 import 时可以使用别名（@），

### 安装依赖
eslit 使用的是 npm init vue@latest 创建项目的eslint规则；增加  '@vue/eslint-config-prettier', 解决 eslint 和 prettier 冲突  
.eslintrc.cjs  
```javascript
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-undef': 'warn',
    'vue/multi-word-component-names': 'off',
  },
}

```
.prettierrc.cjs:  
```javascript
module.exports = {
  // 1.一行代码的最大字符数，默认是80(printWidth: <int>)
  printWidth: 80,
  // 2.tab宽度为2空格(tabWidth: <int>)
  tabWidth: 2,
  // 3.是否使用tab来缩进，我们使用空格(useTabs: <bool>)
  useTabs: false,
  // 4.结尾是否添加分号，false的情况下只会在一些导致ASI错误的其工况下在开头加分号，我选择无分号结尾的风格(semi: <bool>)
  semi: false,
  // 5.使用单引号(singleQuote: <bool>)
  singleQuote: true,
  // 6.object对象中key值是否加引号（quoteProps: "<as-needed|consistent|preserve>"）as-needed只有在需求要的情况下加引号，consistent是有一个需要引号就统一加，preserve是保留用户输入的引号
  quoteProps: 'as-needed',
  // 7.在jsx文件中的引号需要单独设置（jsxSingleQuote: <bool>）
  jsxSingleQuote: false,
  // 8.尾部逗号设置，es5是尾部逗号兼容es5，none就是没有尾部逗号，all是指所有可能的情况，需要node8和es2017以上的环境。（trailingComma: "<es5|none|all>"）
  trailingComma: 'es5',
  // 9.object对象里面的key和value值和括号间的空格(bracketSpacing: <bool>)
  bracketSpacing: true,
  // 10.jsx标签多行属性写法时，尖括号是否另起一行(jsxBracketSameLine: <bool>)
  jsxBracketSameLine: false,
  // 11.箭头函数单个参数的情况是否省略括号，默认always是总是带括号（arrowParens: "<always|avoid>"）
  arrowParens: 'always',
  // 12.range是format执行的范围，可以选执行一个文件的一部分，默认的设置是整个文件（rangeStart: <int>  rangeEnd: <int>）
  rangeStart: 0,
  rangeEnd: Infinity,
  // 18. vue script和style标签中是否缩进,开启可能会破坏编辑器的代码折叠
  // vueIndentScriptAndStyle: false,
  // 19.    endOfLine: "<lf|crlf|cr|auto>" 行尾换行符,默认是lf,
  endOfLine: 'lf',
  // 20.embeddedLanguageFormatting: "off",默认是auto,控制被引号包裹的代码是否进行格式化
  // embeddedLanguageFormatting: 'off',
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在开头文件插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'always',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css'
}


```

### 增加 eslint 检测和修复命令

在 package.json 的 scripts 增加 lint 命令

```json
"scripts": {
  "lint": "eslint src/**/*.{js,jsx,ts,tsx,vue} --fix"
},
```

### 结合 vite 使用

- vite-plugin-eslint - vite 的插件，让项目可以方便的得到 eslint 的支持，完成
  eslint 的配置后，可以快速集成到 vite 中，方便开发者第一时间发现不符合 eslint
  规范的提示

```
yarn add vite-plugin-eslint -D

+ vite-plugin-eslint 1.8.1
```

```ts
// vite.config.ts

import eslintPlugin from "vite-plugin-eslint";
plugins: [vue(), eslintPlugin()],
```

### 修改 eslint 忽略配置文件

在根目录下创建 .eslintignore 文件

```
*.sh
node_modules
*.md
*.woff
*.ttf
.vscode
.idea
dist
lib
/public
/docs
.husky
.local
/bin
.eslintrc.cjs
.prettierrc.cjs
.stylelintrc.cjs
.commitlintrc.cjs

components.d.ts
```

### 修改 prettier 忽略配置文件

在根目录下创建 .prettierignore 文件

```
/dist/*
.local
/node_modules/**
src/.DS_Store

**/*.svg
**/&.sh

/publish/*
components.d.ts
```

### 增加 prettier 格式化命令

在 package.json 的 scripts 增加 prettier:format 命令

```json
  "scripts": {
    "prettier:format": "prettier --config .prettierrc.cjs src/**/*.{js,jsx,ts,tsx,vue} --write"
  },
```

## 集成 husky、lint-staged、Commitizen 、commitlint

- husky - 一个为 git 客户端增加 hook 的工具，在一些 git 操作前自动触发函数，如果
  我们希望在检测错误的同时，自动修复 eslint 语法错误，就可以通过它提供的钩子函数
  实现
- lint-staged - 过滤出 git 暂存区文件（git add 的文件）的工具，将所有暂存文件的
  列表传递给任务
- commitlint - 对 git commit 提交的注释进行校验的工具

### 安装依赖
- commitizen
- cz-customizable
- @commitlint/cli - commitlint 的核心代码库
- @commitlint/config-conventional - 通用的提交规范

```
yarn add commitizen cz-customizable husky lint-staged @commitlint/cli @commitlint/config-conventional -D

+ "commitizen": "^4.3.0",
+ "cz-customizable": "^7.0.0",
+ husky 8.0.2
+ lint-staged 13.0.3
+ @commitlint/cli 17.2.0
+ @commitlint/config-conventional 17.2.0
```

### 生成 husky 脚本 配置 cz-customizable

在 package.json 的 scripts 增加 prepare 命令并执行

- prepare - 在开发模式下（运行 npm install 时），就会运行此脚本命令，简单的说就
  是安装依赖的时候就会去生成 husky 的脚本
- husky 命令
  - add - 添加一个钩子
  - set - 覆盖一个钩子

```json
  "scripts": {
    "prepare": "husky install"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "config/.cz-config.cjs"
    }
  },
```

```
yarn prepare
```

### commit 前代码校验及格式化

#### 添加 git 的 pre-commit 钩子

- pre-commit 钩子会在 git commit 命令执行前触发

执行下面的命令添加 pre-commit 钩子，在钩子触发时执行 npx lint-staged，过滤出暂存
区的代码，去执行后续的代码检测任务

```
npx husky add .husky/pre-commit "npx lint-staged"
```

#### 添加 lint-staged 的检测任务

在 package.json 添加 lint-staged 项（和 scripts 位置同级），对过滤出的
js、jsx、ts、tsx、vue 文件执行 eslint 的检测和 prettier 格式化

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,vue}": ["yarn lint", "yarn prettier:format"]
}
```

### commit message 校验

#### 添加 git 的 commit-msg 钩子

- commit-msg 钩子会在 git commit 时触发执行下面的命令添加 commit-msg 钩子，在钩
  子触发时执行 npx commitlint，对 commit message 进行校验，当不规范时终止提交，
  目前推荐使用 angular 规范

```
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"
```

#### 修改 commitlint 配置文件

在根目录下创建 .commitlintrc.cjs 文件

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

#### 可以使用 git cz 命令提交了 
.cz-config.cjs
```javascript
module.exports = {
  // type 类型(定义之后，可通过上下键选择)
  types: [
    { value: 'feat', name: 'feat:     新增功能' },
    { value: 'fix', name: 'fix:      修复 bug' },
    { value: 'docs', name: 'docs:     文档变更' },
    {
      value: 'style',
      name: 'style:    代码格式(不影响功能，例如空格、分号等格式修正)'
    },
    {
      value: 'refactor',
      name: 'refactor: 代码重构(不包括 bug 修复、功能新增)'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     添加、修改测试用例' },
    {
      value: 'build',
      name: 'build:    构建流程、外部依赖变更(如升级 npm 包、修改 webpack 配置等)'
    },
    { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
    {
      value: 'chore',
      name: 'chore:    对构建过程或辅助工具和库的更改(不影响源文件、测试用例)'
    },
    { value: 'revert', name: 'revert:   回滚 commit' }
  ],

  // scope 类型(定义之后，可通过上下键选择)
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['element-ui', '对 element-ui 的调整'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),

  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  // allowCustomScopes: true,

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',

  // 针对每一个 type 去定义对应的 scopes，例如 fix
  /*
  scopeOverrides: {
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'e2eTest' },
      { name: 'unitTest' }
    ]
  },
  */

  // 交互提示信息
  messages: {
    type: '确保本次提交遵循规范！\n选择你要提交的类型:',
    scope: '\n选择一个 scope(可选):',
    // 选择 scope: custom 时会出下面的提示
    customScope: '请输入自定义的 scope:',
    subject: '填写简短精炼的变更描述:\n',
    body: '填写更加详细的变更描述(可选)。使用 "|" 换行:\n',
    breaking: '列举非兼容性重大的变更(可选):\n',
    footer: '列举出所有变更的 ISSUES CLOSED(可选)。 例如: #31, #34:\n',
    confirmCommit: '确认提交？'
  },

  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],

  // 跳过要询问的步骤
  skipQuestions: ['body', 'footer'],

  // subject 限制长度
  subjectLimit: 100,
  breaklineChar: '|' // 支持 body 和 footer
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true,
}

```

## 集成 stylelint

我们需要先安装 Stylelint 这个 vscode 插件

- stylelint - css 代码检查器，帮助我们规避 css 代码中的错误并保持代码风格的一致

### 安装依赖

```
yarn add stylelint stylelint-config-standard stylelint-config-standard-scss stylelint-config-prettier postcss-html stylelint-config-recommended-vue stylelint-config-recess-order postcss -D

+ postcss-html 1.5.0
+ stylelint-config-prettier 9.0.4
+ stylelint-config-recess-order 3.0.0
+ stylelint-config-recommended-vue 1.4.0
+ stylelint-config-standard-scss 6.1.0
+ postcss 8.4.19
```

- stylelint - Stylelint 核心代码库
- stylelint-config-standard - Stylelint 官方推荐规则
- stylelint-config-standard-scss - Stylelint 官方推荐 scss 规则
- stylelint-config-prettier - 关闭所有不必要的或可能与 Prettier 冲突的规则
- postcss-html - 用于解析 HTML（和类似 HTML）的 PostCSS 语法，可以用于识别 html
  或者 vue 中的样式
- stylelint-config-recommended-vue - 共享 Vue 配置，依赖于 postcss-html
- stylelint-config-recess-order - 用于属性排序

### 修改 stylelint 配置文件

在根目录下创建 .stylelintrc.cjs 文件

```js
// .stylelintrc.cjs

module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
  ],
  overrides: [
    // 扫描 .vue/html 文件中的<style>标签内的样式
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html',
    },
  ],
}
```

### 修改 stylelint 忽略配置文件

在根目录下创建 .stylelintignore 文件

```
public
dist
```

### 增加 stylelint 检测和格式化命令

在 package.json 的 scripts 增加 lint:style 命令

```json
"scripts": {
  "prettier:format": "prettier --config .prettierrc.cjs src/**/*.{js,jsx,ts,tsx,vue} --write"
},
```

### 结合 vite 使用

- vite-plugin-stylelint - vite 的插件，让项目可以方便的得到 stylelint 的支持，完
  成 stylelint 的配置后，可以快速集成到 vite 中，方便开发者第一时间发现不符合
  stylelint 规范的提示

```
yarn add vite-plugin-stylelint -D

+ vite-plugin-stylelint 3.0.8
```

```ts
// vite.config.ts
import vueJsx from '@vitejs/plugin-vue-jsx'
import stylelintPlugin from 'vite-plugin-stylelint'

plugins: [vue(), vueJsx(), eslintPlugin(), stylelintPlugin({ fix: true })],
```

### 结合 lint-staged 使用

添加到 lint-staged 中，对暂存区的文件样式进行格式化

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx,vue}": [
    "yarn lint",
    "yarn prettier:format"
  ],
  "*.{html,css,sass,scss,vue}": [
    "yarn lint:style"
  ]
}
```

## 调试功能与配置文件

团队成员 vscode 配置可能不一样，可能会对 eslint、prettier 和 stylelint 的使用出
现效果不一致的问题，所以可以为每个项目设置一个 vscode 的配置文件，当开发该项目时
，就会以此配置文件为准

在.vscode 文件夹新建 settings.json 文件

```json
// .vscode/settings.json

{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "stylelint.validate": ["css", "scss", "less", "vue"],
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[ts]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## 环境变量和模式

环境一般分为：开发、测试、预发布和生产
