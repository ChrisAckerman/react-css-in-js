# React CSS-in-JS

[![Version](https://badgen.net/npm/v/react-css-in-js)](https://www.npmjs.com/package/react-css-in-js)
[![Size](https://badgen.net/bundlephobia/minzip/react-css-in-js)](https://bundlephobia.com/result?p=react-css-in-js)
[![Deps](https://badgen.net/bundlephobia/dependency-count/react-css-in-js)](https://bundlephobia.com/result?p=react-css-in-js)
[![TreeShaking](https://badgen.net/bundlephobia/tree-shaking/react-css-in-js)](https://bundlephobia.com/result?p=react-css-in-js)

Minimal React css-in-js styled components.

- Write styles using tagged template strings.
- Style any component that accepts a `className` property.
- Theme with type-safety.
- Small bundle size (smaller than both [styled-components](https://bundlephobia.com/result?p=styled-components) and [@emotion/react](https://bundlephobia.com/result?p=@emotion/react)).
- Zero dependencies.
- Class names are stable (and configurable).
- Supports SCSS-like ampersand (`&`) parent selectors.
- Supports _all_ CSS at-rules.
- Supports zero-configuration server-side rendering.

Try it on [codesandbox.io](https://codesandbox.io/s/react-css-in-js-iup6f).

## In comparison to other libraries

Like Emotion's `css` property, but you don't have to use a special JSX pragma or worry about element cloning gotchas.

Like the styled-components pattern, except you have direct control over how component props become HTML element attributes, and you don't have to create multiple components to add "internal" children.

A little more verbose than Emotion or styled-components, but in return you get less magic and the full flexibility and simplicity of plain React.

## Create a styled component

```tsx
import React from 'react';
import { Styled, css, cx } from 'react-css-in-js';

export const Foo: React.FC<{ className?: string }> = (props) => {
  return (
    <Styled
      name={'foo'}
      css={css`
        color: red;
        &:hover {
          color: blue;
        }
      `}
    >
      <div className={cx('foo__root', props.className)}>{props.children}</div>
    </Styled>
  );
};
```

The `<Styled>` component will inject a dynamic class name into the child element, merging with any class names the child already has.

You can also _override_ a styled component's styles by wrapping it with another `<Styled>` component.

```tsx
export const Bar: React.FC<{ className: string }> = (props) => {
  return (
    <Styled
      name={'bar'}
      css={css`
        color: orange;
      `}
    >
      <Foo className={cx('bar__root', props.className)}>{props.children}</Foo>
    </Styled>
  );
};
```

The `cx` utility merges class names, and correctly allows outer styled components to override the styles of inner styled components.

## Inject a global style

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Style, css } from 'react-css-in-js';

ReactDOM.render(
  <Style
    css={css`
      html,
      body {
        padding: 0;
        margin: 0;
      }
    `}
  />,
  document.getElementById('root')
);
```

## Create a type-safe theme

```tsx
import { createTheme } from 'react-css-in-js';

export const [useTheme, ThemeProvider, ThemeConsumer] = createTheme({
  color: 'red',
});
```
