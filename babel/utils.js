const { name } = require("../package.json");

function getDefineMessagesCall(path, state, callback) {
  const { moduleSourceName = name } = state.opts;

  if (path.get("callee").referencesImport(moduleSourceName, "default")) {
    callback(path, state);
  }
}

module.exports = {
  getDefineMessagesCall
};
