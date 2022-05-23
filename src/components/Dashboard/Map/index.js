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
import { restaurantsMapSelector, highlightedRestaurantSelector } from 'store/restaurants/selectors';

import { MapWrapper } from './style';

const mapStateToProps = (state) => ({
  restaurants: restaurantsMapSelector(state),
  highlightedRestaurant: highlightedRestaurantSelector(state),
});

const mapDispatchToProps = {
  setSelectedRestaurantId: mapActions.setSelectedRestaurantId,
};

mapboxgl.accessToken =
  'pk.eyJ1Ijoic2F1ZXJhcHBsZSIsImEiOiJja3VlcHJtd2UxbW9wMnFvOGtzbXEyNHgwIn0.mJ6PjDnMxeZinsKiSs_o6A';

const Map = ({ restaurants, setSelectedRestaurantId, highlightedRestaurant }) => {
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

        setMarkerActive(
          { coordinates, id: properties.id, properties, prevHoveredId },
          map,
          popUpRef,
        );
        setSelectedRestaurantId(features[0].properties.id);
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
    if (mapContainer && highlightedRestaurant && highlightedRestaurant[0]) {
      const features = getMarkerItemFeatures(highlightedRestaurant, mapContainer);

      if (features.length > 0) {
        const { coordinates, id } = highlightedRestaurant[0];
        const restaurantFeatures = features.filter((feature) => feature.properties?.id === id);

        if (restaurantFeatures.length) {
          const { properties } = restaurantFeatures[0];

          setMarkerActive({ coordinates, id, properties, prevHoveredId }, mapContainer, popUpRef);
        }
      }
    }
  }, [highlightedRestaurant]);

  return <MapWrapper ref={mapRef} />;
};

Map.propTypes = {
  restaurants: PropTypes.arrayOf(restuarantMapType),
  setSelectedRestaurantId: PropTypes.func.isRequired,
  highlightedRestaurant: PropTypes.arrayOf(restaurantDetailsType),
};

Map.defaultProps = {
  restaurants: null,
  highlightedRestaurant: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
