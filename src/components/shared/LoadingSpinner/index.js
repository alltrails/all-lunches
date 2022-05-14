import React from 'react';
import PropTypes from 'prop-types';

import colors from 'styles/colors';

import { RingSpinner } from './style';

const LoadingSpinner = ({ color }) => (
  <RingSpinner color={color}>
    <div />
    <div />
    <div />
    <div />
  </RingSpinner>
);

LoadingSpinner.propTypes = {
  color: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  color: colors.blue,
};

export default LoadingSpinner;
