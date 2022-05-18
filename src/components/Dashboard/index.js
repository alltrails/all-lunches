import React, { useState } from 'react';

import Layout from 'components/shared/Layout';
import Map from './Map';

const Dashboard = () => {
  const [isMapView, setIsMapView] = useState(true);

  return (
    <Layout isMapView={isMapView} onMobileViewChange={() => setIsMapView((isMap) => !isMap)}>
      <Map />
    </Layout>
  );
};

export default Dashboard;
