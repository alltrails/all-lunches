import React from 'react';
import PropTypes from 'prop-types';

import colors from 'styles/colors';

const variantFillColor = {
  green: colors.green,
  white: colors.white,
};

const CheckmarkIcon = ({ titleText, variant }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 45 45"
    aria-labelledby="checkmarkIconTitle"
    role="img"
    focusable="false"
  >
    {titleText && <title id="checkmarkIconTitle">{titleText}</title>}
    <g fill="none" fillRule="nonzero">
      <path
        fill={variantFillColor[variant]}
        d="M22.5 0C10.068 0 0 10.068 0 22.5S10.068 45 22.5 45 45 34.932 45 22.5 34.932 0 22.5 0zm8.22 15.257c2.105-.052 3.184 2.517 1.694 4.007l-10.89 10.89a1.768 1.768 0 0 1-2.466 0l-5.496-5.6c-2.26-2.208 1.078-5.547 3.287-3.287l3.083 3.082c.205.206.616.206.821 0l8.425-8.424c.36-.411.925-.668 1.541-.668z"
      />
    </g>
  </svg>
);

CheckmarkIcon.propTypes = {
  titleText: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['white', 'green']),
};

CheckmarkIcon.defaultProps = {
  variant: 'white',
};

export default CheckmarkIcon;
