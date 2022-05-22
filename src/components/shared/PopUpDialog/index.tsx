import React from 'react';

import RestaurantDetails from '../RestaurantDetails';
import { PopUpWrapper } from './style';

type DetailsType = {
  id: string;
  name: string;
  photoUrl: string;
  placeUrl: string;
  priceLevel: number;
  rating: number;
  supportingText: string;
  userRatingsTotal: number;
};

type PopupDialogProps = {
  properties: DetailsType;
};

const PopupDialog = ({
  properties: { name, photoUrl, placeUrl, priceLevel, rating, supportingText, userRatingsTotal },
}: PopupDialogProps) => (
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

export default PopupDialog;
