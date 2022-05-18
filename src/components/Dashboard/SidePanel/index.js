import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { restaurantDetailsType } from 'constants/propTypes';
import debounce from 'lib/debounce';

import * as restaurantsActions from 'store/restaurants/actions';
import {
  restaurantsFilteredListSelector,
  highlightedRestaurantIdSelector,
} from 'store/restaurants/selectors';

import SidePanel from './SidePanel';

const mapStateToProps = (state) => ({
  favoritedItemIds: highlightedRestaurantIdSelector(state),
  restaurants: restaurantsFilteredListSelector(state),
  highlightedRestaurantId: highlightedRestaurantIdSelector(state),
});

const mapDispatchToProps = {
  setFavoritedItems: restaurantsActions.setSelectedItemId,
  setSelectedItemId: restaurantsActions.setSelectedItemId,
};

const SidePanelContainer = ({
  favoritedItemIds,
  restaurants,
  highlightedRestaurantId,
  setFavoritedItemIds,
  setSelectedItemId,
}) => {
  const handleFavoritedItemChange = (itemId, isSelected) => {
    let nextResponse = favoritedItemIds || [];

    if (!isSelected) nextResponse = [...nextResponse, itemId];
    else nextResponse = nextResponse.filter((option) => option !== itemId);

    setFavoritedItemIds(nextResponse);
  };

  const handleMouseEnter = (itemId) => {
    debounce(setSelectedItemId(itemId), 500);
  };

  const handleMouseLeave = () => {
    setSelectedItemId(null);
  };

  console.log('restaurants', restaurants);

  return (
    <SidePanel
      favoritedItemIds={favoritedItemIds}
      onFavoritedItemChange={handleFavoritedItemChange}
      onFavoriteItem={() => {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      restaurants={restaurants}
      highlightedRestaurantId={highlightedRestaurantId}
    />
  );
};

SidePanelContainer.propTypes = {
  favoritedItemIds: PropTypes.arrayOf(PropTypes.string),
  restaurants: PropTypes.arrayOf(restaurantDetailsType),
  highlightedRestaurantId: PropTypes.string,
  setFavoritedItemIds: PropTypes.func.isRequired,
  setSelectedItemId: PropTypes.func.isRequired,
};

SidePanelContainer.defaultProps = {
  highlightedRestaurantId: null,
  restaurants: null,
  favoritedItemIds: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanelContainer);
