import React from 'react';
import PropTypes from 'prop-types';
import { textFieldThemeType } from 'constants/propTypes';

import { TelephoneText, Input, Wrapper } from './style';

const TextField = ({
  disabled,
  hasError,
  labelText,
  maxLength,
  name,
  onBlur,
  onChange,
  theme,
  type,
  value,
}) => (
  <Wrapper hasError={hasError} theme={theme}>
    {type === 'tel' && <TelephoneText>+1</TelephoneText>}
    <Input
      disabled={disabled}
      id={name}
      maxLength={maxLength}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={labelText}
      required
      theme={theme}
      type={type}
      value={value}
    />
  </Wrapper>
);

TextField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  theme: textFieldThemeType.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextField;
