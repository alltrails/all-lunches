import React from 'react';
import colors from 'styles/colors';

import { RingSpinner } from './style';

type LoadingSpinnerProps = {
  color?: string;
};

const LoadingSpinner = ({ color = colors.green }: LoadingSpinnerProps) => (
  <RingSpinner color={color}>
    <div />
    <div />
    <div />
    <div />
  </RingSpinner>
);

export default LoadingSpinner;
