# define-messages

💬 define intl messages done right

![npm](https://img.shields.io/npm/v/define-messages.svg)
![Travis](https://img.shields.io/travis/kevin940726/define-messages.svg) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Key features

This module is mainly started to fix some issues of `react-intl`'s `defineMessages`, which usage is limited and not flexible enough. `define-messages` has almost all the features of `defineMessages` from `react-intl` but more.

- 📦 Babel plugin to extract the defined messages
- 🗑️ Babel plugin to completely remove the function call to enable tree-shaking
- 💪 Flexible nested messages definition

## Installation

```sh
yarn add define-messages
```

## Usage

`defineMessages` function return the same thing as the passed in parameter and will do no effect in run-time. The magic is in the babel plugin.

```js
import defineMessages from "define-messages";

// simple message
const message = defineMessages({
  id: "id",
  defaultMessage: "default message"
});

// multiple messages
const messages = defineMessages({
  title: {
    id: "title id",
    defaultMessage: "title default message"
  },
  description: {
    id: "description id",
    defaultMessage: "description default message"
  }
});

// even nested messages
const groupedMessages = defineMessages({
  animals: {
    cat: {
      id: "cat id",
      defaultMessage: "cat default message"
    }
  }
});
```

### babel-plugin-transform-remove

```js
// .babelrc

plugins: ["define-messages/babel/transform-remove"];
```

Enable it in client side and to completely remove the `defineMessages()` call in the build. It can enable bundler like `webpack` to tree-shake the messages inside the function so that you won't accidentally bundle lots of messages you don't use into your build files.

### babel-plugin-extract

```js
// .babelrc

plugins: ["define-messages/babel/extract"];
```

Run it with babel transform will extract the defined messages into `metadata` of the transformed code. It's practically useful when you want to manually run the script to extract all the defined messages and generate a translation json file.

```js
import { transform } from "@babel/core";

const code = `
  defineMessages({
    title: {
      id: "title id",
      defaultMessage: "title default message"
    },
    description: {
      id: "description id",
      defaultMessage: "description default message"
    }
  });
`;

const { metadata } = transform(code, {
  plugins: ["define-messages/babel/extract"]
});

console.log(metadata["define-messages"].messages);
// [
//   {
//     id: "title id",
//     defaultMessage: "title default message"
//   },
//   {
//     id: "description id",
//     defaultMessage: "description default message"
//   }
// ];
```

## Migrate from react-intl

`define-messages` packaged a [codemod](https://github.com/facebook/jscodeshift) to help you migrate from `react-intl` with a single command.

Run the command in your project root.

```sh
npx jscodeshift -t define-messages/codemod/react-intl-to-define-messages.js <path>
```

Note that it currently only support es module import and the coding style of the transformed code is opinionated, feel free to transform it again with `eslint --fix` or `prettier --write`.

## Author

Kai Hao

## License

MIT
