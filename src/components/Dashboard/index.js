import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useEventListener } from 'lib/customHooks';
import debounce from 'lib/debounce';
import { widthSizes } from 'styles/media';

import { isTouchScreenSelector } from 'store/userAgent/selectors';

import MobileLayout from 'components/shared/Layout/Mobile';
import DefaultLayout from 'components/shared/Layout/Default';

import { LayoutWrapper } from './style';

const mapStateToProps = (state) => ({
  isTouchScreen: isTouchScreenSelector(state),
});

export const Dashboard = ({ isTouchScreen }) => {
  const [isMobileView, setIsMobileView] = useState(isTouchScreen);

  const handleMobileViewObserver = () => {
    if (window.innerWidth < widthSizes.tablet) setIsMobileView(true);
    else if (window.innerWidth > widthSizes.tablet) setIsMobileView(false);
  };

  useEffect(() => handleMobileViewObserver(), []);

  useEventListener('resize', debounce(handleMobileViewObserver, 250));

  return <LayoutWrapper>{isMobileView ? <MobileLayout /> : <DefaultLayout />}</LayoutWrapper>;
};

Dashboard.propTypes = {
  isTouchScreen: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
