module.exports = ({ types: t }) => ({
  visitor: {
    CallExpression(path) {
      const { moduleSourceName = DEFAULT_MODULE_SOURCE_NAME } = state.opts;

      if (path.get("callee").referencesImport(moduleSourceName, "default")) {
        // remove defineMessages function call to enable tree-shaking
        path.replaceWith(path.node.arguments[0]);
      }
    }
  }
});
