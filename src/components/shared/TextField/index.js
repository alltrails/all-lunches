/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import mergeDeep from 'lib/mergeDeep';
import colors from 'styles/colors';
import { textFieldThemeType } from 'constants/propTypes';

import TextField from './TextField';

const DEFAULT_THEME = {
  container: {
    background: 'transparent',
    border: {
      default: colors.blue,
      error: colors.red,
    },
  },
  input: {
    color: {
      default: colors.gray,
    },
  },
  label: {
    color: {
      default: colors.blue,
      error: colors.red,
    },
  },
};

const TextFieldContainer = ({
  disabled,
  hasExternalError,
  labelText,
  maxLength,
  name,
  onBlur,
  onChange,
  theme,
  tid,
  type,
  validate,
  value,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (theme) theme = mergeDeep({}, DEFAULT_THEME, theme);
  }, []);

  const updateValidity = (text) => {
    const errorType = validate(text) || null;
    setHasError(!!errorType);
  };

  const handleBlur = (event) => {
    validate && updateValidity(event.target.value);
    onBlur && onBlur(event);
  };

  const handleChange = (event) => {
    if (hasError) setHasError(false);
    onChange(event);
  };

  return (
    <TextField
      disabled={disabled}
      hasError={hasError || hasExternalError}
      id={name}
      labelText={labelText}
      maxLength={maxLength}
      name={name}
      onBlur={handleBlur}
      onChange={handleChange}
      theme={theme}
      tid={tid}
      type={type}
      value={value}
    />
  );
};

TextFieldContainer.propTypes = {
  disabled: PropTypes.bool,
  hasExternalError: PropTypes.bool,
  labelText: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  theme: textFieldThemeType,
  tid: PropTypes.string,
  type: PropTypes.string,
  validate: PropTypes.func,
  value: PropTypes.string.isRequired,
};

TextFieldContainer.defaultProps = {
  disabled: false,
  hasExternalError: false,
  maxLength: '',
  onBlur: null,
  theme: DEFAULT_THEME,
  tid: '',
  type: 'text',
  validate: null,
};

export default TextFieldContainer;
