/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import DefaultStorePNG from 'assets/store-front.png';
import StarIcon from 'styles/components/StarIcon';
import {
  MetadataWrapper,
  PlaceImage,
  PriceLevelWrapper,
  RatingStarsWrapper,
  Title,
  HyperLinkWrapper,
  UserRatingsTotalText,
  StarIconWrapper,
} from './style';

type RestaurantDetailsProps = {
  name?: string;
  photoUrl?: string;
  placeUrl?: string;
  priceLevel?: number;
  rating?: number;
  supportingText?: string;
  userRatingsTotal?: number;
};

const RestaurantDetails = ({
  name = 'N/A',
  photoUrl = '',
  placeUrl = '',
  priceLevel = 0,
  rating = 0,
  supportingText = 'N/A',
  userRatingsTotal = 0,
}: RestaurantDetailsProps) => {
  const getPriceLevel = (price: number) => {
    if (!price) return 'N/A';
    let dollarSigns = '';

    for (let i = 0; i < priceLevel; i += 1) dollarSigns += '$';
    return dollarSigns;
  };

  const placeImage = photoUrl || DefaultStorePNG;
  return (
    <HyperLinkWrapper href={placeUrl} target="_blank" rel="noopener noreferrer">
      <PlaceImage src={placeImage} alt="storefront" />
      <MetadataWrapper>
        <Title>{name}</Title>
        <RatingStarsWrapper>
          {[...Array(5)].map((_, index) => (
            <StarIconWrapper key={index}>
              <StarIcon color={index + 1 <= Math.round(rating) ? '#f5d24a' : '#E6E6E6'} />
            </StarIconWrapper>
          ))}
          <UserRatingsTotalText>({userRatingsTotal})</UserRatingsTotalText>
        </RatingStarsWrapper>
        <PriceLevelWrapper>
          <span>{getPriceLevel(priceLevel)} </span>
          <span> {'\u2022'} </span>
          <span> {supportingText}</span>
        </PriceLevelWrapper>
      </MetadataWrapper>
    </HyperLinkWrapper>
  );
};

RestaurantDetails.propTypes = {
  name: PropTypes.string,
  photoUrl: PropTypes.string,
  placeUrl: PropTypes.string,
  priceLevel: PropTypes.number,
  rating: PropTypes.number,
  supportingText: PropTypes.string,
  userRatingsTotal: PropTypes.number,
};

RestaurantDetails.defaultProps = {
  name: 'N/A',
  photoUrl: null,
  priceLevel: 0,
  rating: 0,
  userRatingsTotal: 0,
  placeUrl: null,
  supportingText: 'N/A',
};

export default RestaurantDetails;
