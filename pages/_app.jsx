import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Global, css } from '@emotion/react';
import withReduxSaga from 'next-redux-saga';
import wrapper from '../store/configuerStroe';

const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        background: #fafafa;
        line-height: 1;
        font-family: Noto Sans KR, sans-serif;
      }

      ol,
      ul {
        list-style: none;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button,
      button:focus {
        border: none;
        cursor: pointer;
        outline: none;
        background: transparent;
      }

      .ant-card-body {
        padding: 1rem;
      }

      .slick-slide {
        display: inline-block;
      }
    `}
  />
);

function MomoSNS({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Momo</title>
      </Head>
      {globalStyles}
      <Component />
    </>
  );
}

MomoSNS.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(MomoSNS));
