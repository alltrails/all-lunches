import ActivePin from 'assets/active-pin.svg';
import DefaultPin from 'assets/default-pin.svg';
import preloadMapImage from 'lib/preloadMapImage';

import generatePopUp from './generatePopUp';

export const ALL_TRAILS_HQ_LAT = 37.7908279;
export const ALL_TRAILS_HQ_LNG = -122.4082753;

export const getMapsInstance = () => {
  const {
    google: { maps: mapsInstance },
  } = window;

  return mapsInstance;
};

export const toGeoJSONFeature = (coordinates, properties) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates,
  },
  properties,
});

export const addMapControls = (mapContainer, mapboxgl) => {
  mapContainer.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right');

  mapContainer.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      showUserHeading: true,
      trackUserLocation: true,
    }),
    'bottom-right',
  );
};

const setMarkerInactive = (prevHoveredId, mapContainer) => {
  mapContainer.getCanvas().style.cursor = '';
  mapContainer.setLayoutProperty('restaurants-layer', 'icon-image', [
    'match',
    ['get', 'id'],
    prevHoveredId,
    'default-pin',
    'default-pin',
  ]);

  prevHoveredId = null;
};

export const setMarkerActive = (
  { coordinates, id, properties, prevHoveredId },
  mapContainer,
  popUpRef,
) => {
  if (prevHoveredId) setMarkerInactive(prevHoveredId, mapContainer);

  const popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps.length) popUps[0].remove();

  mapContainer.getCanvas().style.cursor = 'pointer';
  mapContainer.flyTo({ essential: true, center: coordinates, speed: 0.7 });

  const coordinatesSliced = coordinates.slice();
  mapContainer.setLayoutProperty('restaurants-layer', 'icon-image', [
    'match',
    ['get', 'id'],
    id,
    'active-pin',
    'default-pin',
  ]);

  generatePopUp({ properties, coordinates: coordinatesSliced }, mapContainer, popUpRef);
  prevHoveredId = id;
};

export const getMarkerItemFeatures = (marker, mapContainer) => {
  const { coordinates } = marker[0];
  const point = mapContainer.project(coordinates);

  return mapContainer.queryRenderedFeatures(point, { layers: ['restaurants-layer'] });
};

export const setSourceLayer = (mapContainer, mapFeatures) => {
  mapContainer.addSource('restaurants', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: mapFeatures,
    },
    generateId: true,
  });

  preloadMapImage(DefaultPin, 'default-pin', mapContainer);
  preloadMapImage(ActivePin, 'active-pin', mapContainer);

  mapContainer.addLayer({
    id: 'restaurants-layer',
    type: 'symbol',
    source: 'restaurants',
    layout: {
      'icon-image': 'default-pin',
      'icon-allow-overlap': true,
      'icon-ignore-placement': true,
    },
  });
};

export const updateSourceLayer = (mapContainer, mapFeatures) => {
  mapContainer.getSource('restaurants').setData({
    type: 'FeatureCollection',
    features: mapFeatures,
  });
};
