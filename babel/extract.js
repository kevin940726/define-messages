const path = require("path");
const fs = require("fs");
const { name } = require("../package.json");

const DEFAULT_MODULE_SOURCE_NAME = `${name}/babel/${path.basename(
  __filename,
  ".js"
)}`;

const MESSAGES_KEY = Symbol("MESSAGES");

const messagesVisitors = {
  ObjectExpression(path, state) {
    const { file } = state;
    const properties = path.get("properties");

    const idPath = properties.find(
      propertyPath => propertyPath.node.key.name === "id"
    );
    const defaultMessagePath = properties.find(
      propertyPath => propertyPath.node.key.name === "defaultMessage"
    );

    if (idPath && defaultMessagePath) {
      const message = {
        id: idPath.node.value.value,
        defaultMessage: defaultMessagePath.node.value.value
      };

      file.get(MESSAGES_KEY).set(message.id, message);
    }
  }
};

module.exports = ({ types: t }) => ({
  pre(file) {
    if (!file.has(MESSAGES_KEY)) {
      file.set(MESSAGES_KEY, new Map());
    }
  },
  visitor: {
    CallExpression(path, state) {
      const { moduleSourceName = DEFAULT_MODULE_SOURCE_NAME } = state.opts;

      if (path.get("callee").referencesImport(moduleSourceName, "default")) {
        path.traverse(messagesVisitors, state);
      }
    }
  },
  post(file) {
    const messages = file.get(MESSAGES_KEY);

    file.metadata[name] = { messages: [...messages.values()] };
  }
});
