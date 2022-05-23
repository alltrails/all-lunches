import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { restaurantDetailsType } from 'constants/propTypes';

import * as restaurantsActions from 'store/restaurants/actions';
import {
  favoritedItemIdsSelector,
  highlightedRestaurantIdSelector,
  restaurantsFilteredListSelector,
  isUpdatingFavoritesSelector,
} from 'store/restaurants/selectors';

import SidePanel from './SidePanel';

const mapStateToProps = (state) => ({
  favoritedItemIds: favoritedItemIdsSelector(state),
  highlightedRestaurantId: highlightedRestaurantIdSelector(state),
  isUpdatingFavorites: isUpdatingFavoritesSelector(state),
  restaurants: restaurantsFilteredListSelector(state),
});

const mapDispatchToProps = {
  updateFavoritedRestaurants: restaurantsActions.updateFavoritedRestaurants,
  setHighlightedRestaurantId: restaurantsActions.setHighlightedRestaurantId,
};

export const SidePanelContainer = ({
  updateFavoritedRestaurants,
  favoritedItemIds,
  highlightedRestaurantId,
  isUpdatingFavorites,
  restaurants,
  setHighlightedRestaurantId,
}) => {
  const handleFavoriteItemChange = (itemId, isSelected) => {
    let favoritedIds = favoritedItemIds;

    if (!isSelected) favoritedIds = [...favoritedIds, itemId];
    else favoritedIds = favoritedIds.filter((optionId) => optionId !== itemId);

    updateFavoritedRestaurants(favoritedIds);
  };

  const handleMouseEnter = (itemId) => {
    setHighlightedRestaurantId(itemId);
  };

  const handleMouseLeave = () => {
    setHighlightedRestaurantId(null);
  };

  return (
    <SidePanel
      favoritedItemIds={favoritedItemIds}
      highlightedRestaurantId={highlightedRestaurantId}
      isUpdatingFavorites={isUpdatingFavorites}
      onFavoriteItemChange={handleFavoriteItemChange}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      restaurants={restaurants}
    />
  );
};

SidePanelContainer.propTypes = {
  favoritedItemIds: PropTypes.arrayOf(PropTypes.string),
  updateFavoritedRestaurants: PropTypes.func.isRequired,
  highlightedRestaurantId: PropTypes.string,
  isUpdatingFavorites: PropTypes.bool.isRequired,
  restaurants: PropTypes.arrayOf(restaurantDetailsType),
  setHighlightedRestaurantId: PropTypes.func.isRequired,
};

SidePanelContainer.defaultProps = {
  highlightedRestaurantId: null,
  restaurants: null,
  favoritedItemIds: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelContainer);
