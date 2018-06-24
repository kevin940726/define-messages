// jscodeshift codemod script to migrate to `define-messages` from `react-intl`

module.exports = ({ source }, { jscodeshift: j }, options) =>
  j(source)
    .find(
      j.ImportDeclaration,
      path =>
        path.source.value === "react-intl" &&
        path.specifiers.find(
          specifier => specifier.imported.name === "defineMessages"
        )
    )
    .forEach(path => {
      const defineMessagesSpecifier = path.value.specifiers.find(
        specifier => specifier.imported.name === "defineMessages"
      );
      const defineMessagesIdentifier =
        defineMessagesSpecifier.local || j.identifier("defineMessages");

      path.value.specifiers = path.value.specifiers.filter(
        specifier => specifier !== defineMessagesSpecifier
      );

      // only imported `defineMessages`, remove the whole import statement and replace the source to `define-messages`
      if (!path.value.specifiers.length) {
        path.value.specifiers = [
          j.importDefaultSpecifier(defineMessagesIdentifier)
        ];
        path.value.source.value = "define-messages";

        return;
      }

      // inject defineMessages into the next line
      const importStatement = j.importDeclaration(
        [j.importDefaultSpecifier(defineMessagesIdentifier)],
        j.literal("define-messages")
      );

      j(path).insertAfter(importStatement);
    })
    .toSource(options);
