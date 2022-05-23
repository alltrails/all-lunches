import React from 'react';
import PropTypes from 'prop-types';
import FocusTrapReact from 'focus-trap-react';

const FocusTrap = ({ children, clickOutsideDeactivates, fallbackFocus }) => (
  <FocusTrapReact focusTrapOptions={{ clickOutsideDeactivates, fallbackFocus }}>
    {children}
  </FocusTrapReact>
);

FocusTrap.propTypes = {
  children: PropTypes.node.isRequired,
  clickOutsideDeactivates: PropTypes.bool,
  fallbackFocus: PropTypes.any,
};

FocusTrap.defaultProps = {
  clickOutsideDeactivates: true,
  fallbackFocus: null,
};

export default FocusTrap;
