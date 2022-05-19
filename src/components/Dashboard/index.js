import React, { useEffect, useState } from 'react';

import { useEventListener } from 'lib/customHooks';
import debounce from 'lib/debounce';
import { widthSizes } from 'styles/media';

import Header from 'components/Dashboard/Header';
import SidePanel from 'components/Dashboard/SidePanel';
import MobileButton from 'components/shared/MobileViewButton';

import { MapWrapper, HeaderWrapper, LayoutWrapper, SidePanelWrapper } from './style';

import Map from './Map';

const Dashboard = () => {
  const [isMapViewEnabled, setIsMapViewEnabled] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleMobileViewObserver = () => {
    if (window.innerWidth < widthSizes.tablet) {
      setIsMobileView(true);
      setIsMapViewEnabled(true);
    } else if (window.innerWidth > widthSizes.tablet) {
      setIsMobileView(false);
    }
  };

  useEffect(() => handleMobileViewObserver(), []);

  useEventListener('resize', debounce(handleMobileViewObserver), 150);

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <SidePanelWrapper isVisible={!isMapViewEnabled} isMobileView={isMobileView}>
        <SidePanel />
      </SidePanelWrapper>
      <MapWrapper isVisible={isMapViewEnabled} isMobileView={isMobileView}>
        <Map />
      </MapWrapper>
      {isMobileView && (
        <MobileButton
          isMapViewEnabled={isMapViewEnabled}
          onClick={() => setIsMapViewEnabled((isMapEnabled) => !isMapEnabled)}
        />
      )}
    </LayoutWrapper>
  );
};

export default Dashboard;
