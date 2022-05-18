import {
  any,
  arrayOf,
  Element,
  func,
  instanceOf,
  number,
  oneOfType,
  shape,
  string,
} from 'prop-types';

export const restaurantDetailsType = shape({
  id: string,
  name: string,
  photoUrl: string,
  placeUrl: string,
  priceLevel: number,
  rating: number,
  supportingText: string,
  userRatingsTotal: number,
});

export const restuarantMapType = shape({
  geometry: shape({ type: string.isRequired, coordinates: arrayOf(number) }),
  properties: restaurantDetailsType,
  type: string.isRequired,
});

export const refType = oneOfType([func, shape({ current: instanceOf(Element) })]);

export const userType = any;
