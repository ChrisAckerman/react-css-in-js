import React, { FC, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import pretty from 'pretty';

import { css } from './css';
import { Style } from './components/Style';
import { Styled } from './components/Styled';

type TestFC = FC<{ styles?: ReactElement; className?: string }>;

it('should insert styles into the head', () => {
  jsdom.window.document.body.innerHTML = `<div id="root" />`;

  ReactDOM.render(getJsx(), document.getElementById('root'));
  expect(pretty(jsdom.serialize())).toMatchInlineSnapshot(`
    "<!DOCTYPE html>
    <html>

      <head>
        <style data-rcij=\\"rbpuzo\\">
          :root {
            color: green;
            padding: 0 1px 2em 3rem;
          }
        </style>
        <style data-rcij=\\"a/1bg8z9n\\">
          .a--rcij-1bg8z9n {
            color: blue;
          }
        </style>
        <style data-rcij=\\"a/edkdb8\\">
          .a--rcij-edkdb8 {
            color: red;
            color: blue;
          }
        </style>
        <style data-rcij=\\"a/9pvgme\\">
          .a--rcij-9pvgme {
            color: red;
          }
        </style>
        <style data-rcij=\\"d1z182\\">
          :root {
            color: black;
          }
        </style>
      </head>

      <body>
        <div id=\\"root\\">
          <div class=\\"a--rcij-edkdb8\\">foo</div>
          <div class=\\"a--rcij-1bg8z9n\\">bar</div>
          <div class=\\"a--rcij-9pvgme\\">baz</div>
        </div>
      </body>

    </html>"
  `);
});

function getJsx() {
  const A: TestFC = ({ styles, className, children }) => {
    return (
      <Styled scope={'a'} className={className}>
        {styles}
        <div>{children}</div>
      </Styled>
    );
  };

  return (
    <>
      <Style>{css`
        color: green;
        padding: 0 1px 2em 3rem;
      `}</Style>
      <Styled scope={'a'}>
        {css`
          color: blue;
        `}
        <A
          styles={css`
            color: red;
          `}
        >
          foo
        </A>
      </Styled>
      <A
        styles={css`
          color: blue;
        `}
      >
        bar
      </A>
      <A
        styles={css`
          color: red;
        `}
      >
        baz
      </A>
      <Style>{css`
        color: black;
      `}</Style>
    </>
  );
}
