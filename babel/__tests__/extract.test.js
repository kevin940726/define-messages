import { transform } from "@babel/core";
import { name } from "../../package.json";
import extractPlugin from "../extract";

test("extract to some place", () => {
  const code = `
    import defineMessages from 'define-messages/babel/extract';

    defineMessages({
      id: 'some id',
      defaultMessage: 'some defaultMessage',
    });

    defineMessages({
      title: {
        id: 'title id',
        defaultMessage: 'title defaultMessage',
      },
      description: {
        id: 'description id',
        defaultMessage: 'description defaultMessage',
      },
    });
  `;

  const transformed = transform(code, {
    plugins: [extractPlugin]
  });

  expect(transformed.metadata[name].messages).toMatchSnapshot();
});
