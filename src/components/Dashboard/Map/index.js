import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import { restuarantMapType, restaurantDetailsType } from 'constants/propTypes';
import {
  addMapControls,
  ALL_TRAILS_HQ_LAT,
  ALL_TRAILS_HQ_LNG,
  getMarkerItemFeatures,
  setMarkerActive,
  setSourceLayer,
  updateSourceLayer,
} from 'lib/mapUtils';

import * as mapActions from 'store/restaurants/actions';
import {
  restaurantsMapSelector,
  highlightedRestaurantMapSelector,
} from 'store/restaurants/selectors';

import { MapWrapper } from './style';

const mapStateToProps = (state) => ({
  restaurants: restaurantsMapSelector(state),
  selectedMapItem: highlightedRestaurantMapSelector(state),
});

const mapDispatchToProps = {
  setSelectedItemId: mapActions.setSelectedItemId,
};

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2F1ZXJhcHBsZSIsImEiOiJja3VlcHJtd2UxbW9wMnFvOGtzbXEyNHgwIn0.mJ6PjDnMxeZinsKiSs_o6A';

const Map = ({ restaurants, setSelectedItemId, selectedMapItem }) => {
  const mapRef = useRef(null);
  const popUpRef = useRef(
    new mapboxgl.Popup({ maxWidth: '400px', closeButton: false, offset: 15 }),
  );

  const [mapContainer, setMapContainer] = useState(null);
  const prevHoveredId = null;

  useEffect(() => {
    const map = new mapboxgl.Map({
      center: [ALL_TRAILS_HQ_LNG, ALL_TRAILS_HQ_LAT],
      container: mapRef.current,
      style: 'mapbox://styles/sauerapple/cl3506omy000214oiur3ytq1c',
      zoom: 16,
    });

    map.on('load', () => restaurants && setSourceLayer(map, restaurants));

    map.on('mouseenter', 'restaurants-layer', (e) => {
      const features = map.queryRenderedFeatures(e.point);
      map.getCanvas().style.cursor = 'pointer';

      if (features.length > 0) {
        const {
          geometry: { coordinates },
          properties,
        } = features[0];

        setMarkerActive({ coordinates, properties, prevHoveredId }, map, popUpRef);
        setSelectedItemId(features[0].properties.id);
      }
    });

    addMapControls(map, mapboxgl);
    setMapContainer(map);

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (restaurants && mapContainer) updateSourceLayer(mapContainer, restaurants);
  }, [restaurants]);

  useEffect(() => {
    if (selectedMapItem && selectedMapItem[0]) {
      const features = getMarkerItemFeatures(selectedMapItem, mapContainer);

      if (features.length > 0) {
        const { coordinates } = selectedMapItem[0];
        const { properties } = features[0];

        setMarkerActive({ coordinates, properties, prevHoveredId }, mapContainer, popUpRef);
      }
    }
  }, [selectedMapItem]);

  return <MapWrapper ref={mapRef} />;
};

Map.propTypes = {
  restaurants: PropTypes.arrayOf(restuarantMapType),
  setSelectedItemId: PropTypes.func.isRequired,
  selectedMapItem: PropTypes.arrayOf(restaurantDetailsType),
};

Map.defaultProps = {
  restaurants: null,
  selectedMapItem: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
