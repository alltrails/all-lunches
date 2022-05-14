import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from 'components/shared/LoadingSpinner';

import { Button, ButtonText, LoadingWrapper, variantStyles } from './style';

const SimpleButton = ({
  children,
  disabled,
  focusOutlineColor,
  full,
  isFadedWhenLoading,
  loading,
  name,
  onClick,
  pulsing,
  size,
  type,
  variant,
}) => (
  <Button
    disabled={disabled || loading}
    faded={disabled || (loading && isFadedWhenLoading)}
    focusOutlineColor={focusOutlineColor}
    pulsing={pulsing}
    full={full}
    name={name}
    onClick={onClick}
    size={size}
    type={type}
    variant={variant}
  >
    <ButtonText isVisible={!loading}>{children}</ButtonText>
    {loading && (
      <LoadingWrapper>
        <LoadingSpinner color={variantStyles[variant].color} />
      </LoadingWrapper>
    )}
  </Button>
);

SimpleButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  focusOutlineColor: PropTypes.string,
  full: PropTypes.bool,
  isFadedWhenLoading: PropTypes.bool,
  loading: PropTypes.bool,
  name: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  pulsing: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md']),
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'white', 'outline']),
};

SimpleButton.defaultProps = {
  disabled: false,
  focusOutlineColor: null,
  full: false,
  isFadedWhenLoading: true,
  loading: false,
  name: undefined,
  pulsing: false,
  size: 'md',
  type: 'button',
  variant: 'primary',
};

export default SimpleButton;
