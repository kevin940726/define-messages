const { transform } = require("@babel/core");
const { name } = require("../../package.json");
const extractPlugin = require("../extract");

test("extract simple object message descriptor", () => {
  const message = {
    id: "message id",
    defaultMessage: "message default message"
  };

  console.log(JSON.stringify(message));

  const code = `
    import defineMessages from 'define-messages';

    defineMessages(${JSON.stringify(message)});
  `;

  const transformed = transform(code, {
    plugins: [extractPlugin]
  });

  expect(transformed.metadata[name].messages).toEqual([message]);
});

test("extract several object message descriptors", () => {
  const messages = {
    title: {
      id: "title id",
      defaultMessage: "title default message"
    },
    description: {
      id: "description id",
      defaultMessage: "description default message"
    }
  };

  const code = `
    import defineMessages from 'define-messages';

    defineMessages(${JSON.stringify(messages)});
  `;

  const transformed = transform(code, {
    plugins: [extractPlugin]
  });

  expect(transformed.metadata[name].messages).toEqual([messages]);
});
