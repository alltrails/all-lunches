import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Dashboard/Header';
import SidePanel from 'components/Dashboard/SidePanel';

import MapIcon from 'assets/map-icon.svg';
import ListIcon from 'assets/list-icon.svg';

import {
  ContentWrapper,
  HeaderWrapper,
  LayoutWrapper,
  MobileIcon,
  MobileToggleButton,
  SidePanelWrapper,
} from './style';

const Layout = ({ isMapView, onMobileViewChange, children }) => (
  <LayoutWrapper>
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <SidePanelWrapper isHidden={!isMapView}>
      <SidePanel />
    </SidePanelWrapper>
    <ContentWrapper>{children}</ContentWrapper>
    <MobileToggleButton onClick={onMobileViewChange}>
      {isMapView ? 'Map' : 'List'}
      <MobileIcon src={isMapView ? MapIcon : ListIcon} alt="" />
    </MobileToggleButton>
  </LayoutWrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  onMobileViewChange: PropTypes.func.isRequired,
  isMapView: PropTypes.bool.isRequired,
};

export default Layout;
