import React from 'react';
import PropTypes from 'prop-types';

import colors from 'styles/colors';

const variantFillColor = {
  green: colors.green,
  gray: colors.heartGrayBorder,
};

const HeartIcon = ({ variant }) => (
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.1908 3.10684C10.379 3.36594 10.6798 3.51927 11 3.51927C11.3202 3.51927 11.621 3.36594 11.8092 3.10684C12.7412 1.82335 14.2315 1 15.9053 1C18.7033 1 21 3.31099 21 6.19782C21 7.42208 20.5865 8.54315 19.8966 9.42896L11.7165 17.8306C11.3239 18.2338 10.6761 18.2338 10.2835 17.8306L2.10324 9.4288C1.41303 8.5434 1 7.42247 1 6.19782C1 3.31099 3.29673 1 6.09473 1C7.76846 1 9.25884 1.82335 10.1908 3.10684Z"
      strokeWidth="2"
      stroke={variantFillColor[variant]}
      fill={variant === 'green' ? variantFillColor[variant] : undefined}
      strokeLinejoin="round"
    />
  </svg>
);

HeartIcon.propTypes = {
  variant: PropTypes.oneOf(['gray', 'green']),
};

HeartIcon.defaultProps = {
  variant: 'gray',
};

export default HeartIcon;
