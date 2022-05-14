import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/react';

import Config from 'config'; // eslint-disable-line

import ErrorView from './ErrorView';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (Config.isAnalyticsEnabled) {
      Sentry.withScope((scope) => {
        scope.setExtras(errorInfo);
        Sentry.captureException(error);
      });
    }
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? <ErrorView /> : children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
