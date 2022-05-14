import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from '../src/styles/global';

const Wrapper = styled.div`
  height: 100vh;
  background-color: #f6f6f6;
`;

export default (story) => (
  <Wrapper>
    {story()}
    <GlobalStyle />
  </Wrapper>
);
