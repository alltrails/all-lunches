import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { restaurantDetailsType } from 'constants/propTypes';
import debounce from 'lib/debounce';

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
  addFavoritedRestaurant: restaurantsActions.addFavoritedRestaurant,
  setSelectedRestaurantId: restaurantsActions.setSelectedRestaurantId,
};

const SidePanelContainer = ({
  addFavoritedRestaurant,
  favoritedItemIds,
  highlightedRestaurantId,
  isUpdatingFavorites,
  restaurants,
  setSelectedRestaurantId,
}) => {
  const handleFavoritedItemChange = (itemId, isSelected) => {
    let favoritedIds = favoritedItemIds;

    if (!isSelected) favoritedIds = [...favoritedIds, itemId];
    else favoritedIds = favoritedIds.filter((optionId) => optionId !== itemId);

    addFavoritedRestaurant(favoritedIds);
  };

  const handleMouseEnter = (itemId) => {
    debounce(setSelectedRestaurantId(itemId), 250);
  };

  const handleMouseLeave = () => {
    setSelectedRestaurantId(null);
  };

  return (
    <SidePanel
      favoritedItemIds={favoritedItemIds}
      highlightedRestaurantId={highlightedRestaurantId}
      isUpdatingFavorites={isUpdatingFavorites}
      onFavoritedItemChange={handleFavoritedItemChange}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      restaurants={restaurants}
    />
  );
};

SidePanelContainer.propTypes = {
  favoritedItemIds: PropTypes.arrayOf(PropTypes.string),
  addFavoritedRestaurant: PropTypes.func.isRequired,
  highlightedRestaurantId: PropTypes.string,
  isUpdatingFavorites: PropTypes.bool.isRequired,
  restaurants: PropTypes.arrayOf(restaurantDetailsType),
  setSelectedRestaurantId: PropTypes.func.isRequired,
};

SidePanelContainer.defaultProps = {
  highlightedRestaurantId: null,
  restaurants: null,
  favoritedItemIds: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelContainer);
