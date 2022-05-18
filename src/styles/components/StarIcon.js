import React from 'react';
import PropTypes from 'prop-types';

const StarIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99946 0L9.88828 5.72936H16L11.0553 9.27064L12.9441 15L7.99946 11.4587L3.05477 15L4.94359 9.27064L0 5.72936H6.11063L7.99946 0Z"
      fill={color}
    />
  </svg>
);

StarIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default StarIcon;
