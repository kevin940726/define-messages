const path = require("path");
const fs = require("fs");
const { name } = require("../package.json");
const { getDefineMessagesCall } = require("./utils");

const MESSAGES_KEY = Symbol("MESSAGES");

const messagesVisitors = {
  ObjectExpression(path, state) {
    const { file } = state;
    const properties = path.get("properties");

    const { value: message } = path.evaluate();

    if (message && ["id", "defaultMessage"].includes(Object.keys(message))) {
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
      getDefineMessagesCall(path, state, () => {
        path.traverse(messagesVisitors, state);
      });
    }
  },
  post(file) {
    const messages = file.get(MESSAGES_KEY);

    file.metadata[name] = { messages: [...messages.values()] };
  }
});
