import React from 'react';
import PropTypes from 'prop-types';

import { restaurantDetailsType } from 'constants/propTypes';

import RestaurantDetails from 'components/shared/RestaurantDetails';
import HeartIcon from 'components/svg/HeartIcon';

import { FavoriteHeartButton, CardItem, CardList, PanelWrapper } from './style';

const SidePanel = ({
  favoritedItems,
  onFavoriteItem,
  onMouseEnter,
  onMouseLeave,
  restaurants,
  highlightedRestaurantId,
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

        const isItemFavorited = favoritedItems.includes(id);
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
            <FavoriteHeartButton onClick={() => onFavoriteItem(id, isItemFavorited)}>
              <HeartIcon variant={isItemFavorited ? 'green' : 'gray'} />
            </FavoriteHeartButton>
          </CardItem>
        );
      })}
    </CardList>
  </PanelWrapper>
);
SidePanel.propTypes = {
  onFavoriteItem: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  restaurants: PropTypes.arrayOf(restaurantDetailsType),
  highlightedRestaurantId: PropTypes.string,
  favoritedItems: PropTypes.arrayOf(PropTypes.string),
};

SidePanel.defaultProps = {
  highlightedRestaurantId: null,
  restaurants: null,
  favoritedItems: [],
};

export default SidePanel;
