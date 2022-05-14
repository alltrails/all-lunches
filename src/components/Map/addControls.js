export default (map, mapboxgl) => {
  map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'bottom-right');

  map.addControl(
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
