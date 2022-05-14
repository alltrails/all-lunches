export function getBoundsRadius(bounds) {
  const center = bounds.getCenter();
  const ne = bounds.getNorthEast();

  // Radius of the earth in km
  const r = 6378.8;

  // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
  const lat1 = center.lat / 57.2958;
  const lon1 = center.lng / 57.2958;
  const lat2 = ne.lat / 57.2958;
  const lon2 = ne.lng / 57.2958;

  // Distance = circle radius from center to Northeast corner of bounds
  const distance =
    r *
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1),
    );

  // Radius in meters
  return distance * 1000;
}

export const toGeoJSONFeature = (coordinates, properties) => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates,
  },
  properties,
});

export const mergeReports = (currentReports, newReports) => {
  const reports = { ...currentReports };
  Object.keys(newReports).forEach((key) => {
    const currentData = currentReports[key];
    const newData = newReports[key];

    reports[key] = [...currentData, ...newData];
  });

  return reports;
};
