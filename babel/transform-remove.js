const { name } = require("../package.json");
const { getDefineMessagesCall } = require("./utils");

module.exports = ({ types: t }) => ({
  visitor: {
    CallExpression(path, state) {
      getDefineMessagesCall(path, state, () => {
        // remove defineMessages function call to enable tree-shaking
        path.replaceWith(path.node.arguments[0]);
      });
    }
  }
});
