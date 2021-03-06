/* eslint-disable @typescript-eslint/no-var-requires */
import React, { VFC } from 'react';
import ReactDOM from 'react-dom';
import pretty from 'pretty';
import { css } from './css';
import { Styled } from './components/Styled';

const A: VFC = () => {
  return (
    <Styled scope={'a'}>
      {css`
        color: red;
      `}
      <div />
    </Styled>
  );
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('should gc unused styles', async () => {
  window.document.body.innerHTML = `<div id="root" />`;
  const root = window.document.getElementById('root');

  ReactDOM.render(
    <>
      <A key={'1'} />
    </>,
    root
  );
  jest.runAllTimers();

  expect(pretty(jsdom.serialize())).toMatchInlineSnapshot(`
    "<!DOCTYPE html>
    <html>

      <head>
        <style data-rcij=\\"a/9pvgme\\">
          .a--rcij-9pvgme {
            color: red;
          }
        </style>
      </head>

      <body>
        <div id=\\"root\\">
          <div class=\\"a--rcij-9pvgme\\"></div>
        </div>
      </body>

    </html>"
  `);

  ReactDOM.render(
    <>
      <A key={'1'} />
      <A key={'2'} />
    </>,
    root
  );
  jest.runAllTimers();

  expect(pretty(jsdom.serialize())).toMatchInlineSnapshot(`
    "<!DOCTYPE html>
    <html>

      <head>
        <style data-rcij=\\"a/9pvgme\\">
          .a--rcij-9pvgme {
            color: red;
          }
        </style>
      </head>

      <body>
        <div id=\\"root\\">
          <div class=\\"a--rcij-9pvgme\\"></div>
          <div class=\\"a--rcij-9pvgme\\"></div>
        </div>
      </body>

    </html>"
  `);

  ReactDOM.render(
    <>
      <A key={'2'} />
    </>,
    root
  );
  jest.runAllTimers();

  expect(pretty(jsdom.serialize())).toMatchInlineSnapshot(`
    "<!DOCTYPE html>
    <html>

      <head>
        <style data-rcij=\\"a/9pvgme\\">
          .a--rcij-9pvgme {
            color: red;
          }
        </style>
      </head>

      <body>
        <div id=\\"root\\">
          <div class=\\"a--rcij-9pvgme\\"></div>
        </div>
      </body>

    </html>"
  `);

  ReactDOM.render(<></>, root);
  jest.runAllTimers();

  expect(pretty(jsdom.serialize())).toMatchInlineSnapshot(`
    "<!DOCTYPE html>
    <html>

      <head></head>

      <body>
        <div id=\\"root\\"></div>
      </body>

    </html>"
  `);
});
