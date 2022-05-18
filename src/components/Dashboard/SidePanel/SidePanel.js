import React from 'react';
import PropTypes from 'prop-types';

import { restaurantDetailsType } from 'constants/propTypes';

import RestaurantDetails from 'components/shared/RestaurantDetails';
import HeartIcon from 'components/svg/HeartIcon';
import LoadingSpinner from 'components/shared/LoadingSpinner';

import {
  FavoriteHeartWrapper,
  FavoriteHeartButton,
  CardItem,
  CardList,
  PanelWrapper,
} from './style';

const SidePanel = ({
  favoritedItemIds,
  highlightedRestaurantId,
  isUpdatingFavorites,
  onFavoritedItemChange,
  onMouseEnter,
  onMouseLeave,
  restaurants,
}) => (
  <PanelWrapper>
    <CardList>
      {restaurants.map((restaurant) => {
        const {
          id,
          name,
          photoUrl,
          placeUrl,
          priceLevel,
          rating,
          supportingText,
          userRatingsTotal,
        } = restaurant;

        const isItemFavorited = favoritedItemIds.includes(id);
        return (
          <CardItem
            key={id}
            onMouseEnter={() => onMouseEnter(id)}
            onMouseLeave={onMouseLeave}
            isSelected={id === highlightedRestaurantId}
          >
            <RestaurantDetails
              name={name}
              photoUrl={photoUrl}
              placeUrl={placeUrl}
              priceLevel={priceLevel}
              rating={rating}
              supportingText={supportingText}
              userRatingsTotal={userRatingsTotal}
            />
            <FavoriteHeartWrapper>
              <FavoriteHeartButton onClick={() => onFavoritedItemChange(id, isItemFavorited)}>
                {isUpdatingFavorites ? (
                  <LoadingSpinner />
                ) : (
                  <HeartIcon variant={isItemFavorited ? 'green' : 'gray'} />
                )}
              </FavoriteHeartButton>
            </FavoriteHeartWrapper>
          </CardItem>
        );
      })}
    </CardList>
  </PanelWrapper>
);
SidePanel.propTypes = {
  favoritedItemIds: PropTypes.arrayOf(PropTypes.string),
  isUpdatingFavorites: PropTypes.bool.isRequired,
  highlightedRestaurantId: PropTypes.string,
  onFavoritedItemChange: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  restaurants: PropTypes.arrayOf(restaurantDetailsType),
};

SidePanel.defaultProps = {
  highlightedRestaurantId: null,
  restaurants: null,
  favoritedItemIds: [],
};

export default SidePanel;
