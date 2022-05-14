import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isAppInitializingSelector } from 'store/app/selectors';

import LoadingSpinner from 'components/shared/LoadingSpinner';

import Map from '../Map';
import Header from '../Header';

import { Wrapper, LoadingWrapper, LoadingTitle } from './style';

const mapStateToProps = (state) => ({
  isLoading: isAppInitializingSelector(state),
});

const mapDispatchToProps = {};

const App = ({ isLoading }) => {
  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingTitle>Loading</LoadingTitle>
        <LoadingSpinner />
      </LoadingWrapper>
    );
  }

  return (
    <Wrapper>
      <Header />
      <Map />
    </Wrapper>
  );
};

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
