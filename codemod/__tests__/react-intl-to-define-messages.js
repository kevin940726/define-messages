const defineInlineTest = require("jscodeshift/dist/testUtils").defineInlineTest;
const transform = require("../react-intl-to-define-messages");

defineInlineTest(
  transform,
  {},
  `import { defineMessages } from "react-intl";`,
  `import defineMessages from "define-messages";`
);

defineInlineTest(
  transform,
  {},
  `import { defineMessages as d } from "react-intl";`,
  `import d from "define-messages";`
);

defineInlineTest(
  transform,
  {},
  `import { FormattedMessage, defineMessages } from "react-intl";`,
  `import { FormattedMessage } from "react-intl";
import defineMessages from "define-messages";`
);

defineInlineTest(
  transform,
  {},
  `import { FormattedMessage, defineMessages as d } from "react-intl";`,
  `import { FormattedMessage } from "react-intl";
import d from "define-messages";`
);

defineInlineTest(
  transform,
  { quote: "single" },
  `import { defineMessages } from "react-intl";`,
  `import defineMessages from 'define-messages';`
);
