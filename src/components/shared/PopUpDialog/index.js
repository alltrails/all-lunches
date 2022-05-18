import React from 'react';

import { restaurantDetailsType } from 'constants/propTypes';

import RestaurantDetails from '../RestaurantDetails';
import { PopUpWrapper } from './style';

const PopupDialog = ({
  properties: { name, photoUrl, placeUrl, priceLevel, rating, supportingText, userRatingsTotal },
}) => (
  <PopUpWrapper role="dialog">
    <RestaurantDetails
      name={name}
      photoUrl={photoUrl}
      placeUrl={placeUrl}
      priceLevel={priceLevel}
      rating={rating}
      supportingText={supportingText}
      userRatingsTotal={userRatingsTotal}
    />
  </PopUpWrapper>
);

PopupDialog.propTypes = {
  properties: restaurantDetailsType.isRequired,
};

export default PopupDialog;
