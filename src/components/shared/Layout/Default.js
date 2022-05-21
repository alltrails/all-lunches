import React from 'react';

import Header from 'components/Dashboard/Header';
import SidePanel from 'components/Dashboard/SidePanel';
import Map from 'components/Dashboard//Map';

import { MapWrapper, HeaderWrapper, SidePanelWrapper } from './style';

const Default = () => (
  <>
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <SidePanelWrapper>
      <SidePanel />
    </SidePanelWrapper>
    <MapWrapper>
      <Map />
    </MapWrapper>
  </>
);

export default Default;
