export const generateGoogleMapsUrl = (result) => {
  const encodedName = encodeURIComponent(result.name);
  return `https://www.google.com/maps/search/?api=1&query=${encodedName}&query_place_id=${result.placeId}`;
};

export const getPhotoUrl = (photos) => {
  if (!photos) return null;
  return photos[0].getUrl();
};
