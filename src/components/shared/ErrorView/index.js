import React from 'react';
import PropTypes from 'prop-types';

import { ErrorText, ErrorViewWrapper } from './style';

const ErrorView = ({ text }) => (
  <ErrorViewWrapper>
    <ErrorText>
      {text ||
        'Looks like there was an issue. Please refresh the page or try again.'}
    </ErrorText>
  </ErrorViewWrapper>
);

ErrorView.propTypes = {
  text: PropTypes.string,
};

ErrorView.defaultProps = {
  text: null,
};

export default ErrorView;
