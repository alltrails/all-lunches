import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isAppInitializingSelector } from 'store/app/selectors';

import LoadingSpinner from 'components/shared/LoadingSpinner';
import ErrorView from 'components/shared/ErrorView';

import Dashboard from '../Dashboard';
import { LoadingWrapper, LoadingTitle } from './style';

const mapStateToProps = (state) => ({
  isLoading: isAppInitializingSelector(state),
});

export const App = ({ error, isLoading }) => {
  let content = null;

  if (error) {
    content = <ErrorView hasBackground text={error} />;
  } else if (isLoading) {
    content = (
      <LoadingWrapper>
        <LoadingTitle>Loading</LoadingTitle>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  } else content = <Dashboard />;

  return content;
};

App.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

App.defaultProps = {
  error: null,
};

export default connect(mapStateToProps)(App);
