import React from 'react';
import PropTypes from 'prop-types';

import { ErrorText, ErrorViewWrapper } from './style';

type ErrorViewProps = {
  text?: string;
};

const ErrorView = ({ text }: ErrorViewProps) => (
  <ErrorViewWrapper>
    <ErrorText>
      {text || 'Looks like there was an issue. Please refresh the page or try again.'}
    </ErrorText>
  </ErrorViewWrapper>
);

export default ErrorView;
