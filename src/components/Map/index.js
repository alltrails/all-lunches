import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';

// import * as mapActions from 'store/map/actions';

// import { reportsSelector } from 'store/map/selectors';

import mapboxgl from 'mapbox-gl';
import addControls from './addControls';

import { MapWrapper } from './style';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2F1ZXJhcHBsZSIsImEiOiJja3VlcHJtd2UxbW9wMnFvOGtzbXEyNHgwIn0.mJ6PjDnMxeZinsKiSs_o6A';

const ALL_TRAILS_LAT_LNG_ADDRESS = [-122.4082753, 37.7908279];

const Map = ({}) => {
  const mapRef = useRef(null);
  // useEffect(() => {
  //   if (reports) {
  //     Object.keys(reports).forEach((reportType) => {
  //       mapContainer.getSource(reportType).setData({
  //         type: 'FeatureCollection',
  //         features: reports[reportType],
  //       });
  //     });
  //   }
  // }, [reports]);

  useEffect(() => {
    const map = new mapboxgl.Map({
      center: ALL_TRAILS_LAT_LNG_ADDRESS,
      container: mapRef.current,
      style: 'mapbox://styles/sauerapple/cl3506omy000214oiur3ytq1c',
      zoom: 12,
    });

    map.on('load', () => {
      // load fetched restaurants
    });

    // const popup = new mapboxgl.Popup({
    //   closeButton: true,
    //   closeOnClick: true,
    // });

    // const hoveredStateId = null;

    map.on('mouseenter', (e) => {
      // map.getCanvas().style.cursor = 'pointer';
      // if (e.features.length > 0) {
      //   if (hoveredStateId !== null) {
      //     map
      //       .setFeatureState
      //       // {
      //       //   id: hoveredStateId,
      //       //   source: 'composite',
      //       //   sourceLayer: 'sangorgonio',
      //       // },
      //       // { hover: false },
      //       ();
      //   }
      // hoveredStateId = e.features[0].id;
      // map.setFeatureState;
      // {
      //   id: hoveredStateId,
      //   source: 'composite',
      //   sourceLayer: 'sangorgonio',
      // },
      // { hover: true },
      // ();
      // }
    });

    map.on('mouseleave', 'sangorgonio-us-hover', () => {
      // map.getCanvas().style.cursor = '';
      // if (hoveredStateId !== null) {
      // map.setFeatureState(
      //   {
      //     id: hoveredStateId,
      //     source: 'composite',
      //     sourceLayer: 'sangorgonio',
      //   },
      //   { hover: false },
      // );
      // }
      // hoveredStateId = null;
    });

    map.on('click', (e) => {
      // const features = map.queryRenderedFeatures(e.point);
      // console.log('features', features);
    });

    addControls(map, mapboxgl);

    return () => map.remove();
  }, []);

  return <MapWrapper ref={mapRef} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
