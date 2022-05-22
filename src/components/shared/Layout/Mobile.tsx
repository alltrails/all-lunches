import React, { useState } from 'react';

import Header from 'components/Dashboard/Header';
import SidePanel from 'components/Dashboard/SidePanel';
import MobileButton from 'components/shared/MobileViewButton';
import Map from 'components/Dashboard//Map';

import { MapWrapper, HeaderWrapper, SidePanelMobileWrapper } from './style';

const Mobile = () => {
  const [isMapViewEnabled, setIsMapViewEnabled] = useState(true);

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      {!isMapViewEnabled ? (
        <SidePanelMobileWrapper>
          <SidePanel />
        </SidePanelMobileWrapper>
      ) : (
        <MapWrapper>
          <Map />
        </MapWrapper>
      )}
      <MobileButton
        isMapViewEnabled={isMapViewEnabled}
        onClick={() => setIsMapViewEnabled((isMapEnabled) => !isMapEnabled)}
      />
    </>
  );
};

export default Mobile;
