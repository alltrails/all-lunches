import React from 'react';
import PropTypes from 'prop-types';

import Header from 'components/Dashboard/Header';
import SidePanel from 'components/Dashboard/SidePanel';

import { HeaderWrapper, ContentWrapper, LayoutWrapper, SidePanelWrapper } from './style';

const Layout = ({ children }) => (
  <LayoutWrapper>
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <SidePanelWrapper>
      <SidePanel />
    </SidePanelWrapper>
    <ContentWrapper>{children}</ContentWrapper>
  </LayoutWrapper>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
