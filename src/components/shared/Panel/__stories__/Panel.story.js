import React, { useState } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import Panel from '../Panel';

const Wrapper = styled.div`
  background: #fff;
  position: relative;
  height: 100vh;
`;

storiesOf('Panel', module).add('default', () => (
  <Wrapper>
    <Panel />
  </Wrapper>
));
