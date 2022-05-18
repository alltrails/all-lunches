import React, { useState } from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { restaurantsMock } from '__mocks__';

import colors from 'styles/colors';
import SidePanel from '../SidePanel';

const Wrapper = styled.div`
  background-color: ${colors.white};
  max-width: 500px;
  height: 100vh;
`;

const SidePanelStory = () => {
  const [favoritedItemIds, setFavoritedItems] = useState([]);

  const handleChange = (itemId, isSelected) => {
    let nextResponse = favoritedItemIds || [];

    if (!isSelected) nextResponse = [...nextResponse, itemId];
    else nextResponse = nextResponse.filter((option) => option !== itemId);

    setFavoritedItems(nextResponse);
  };

  return (
    <Wrapper>
      <SidePanel
        favoritedItemIds={favoritedItemIds}
        onFavoriteItem={handleChange}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        restaurants={restaurantsMock}
        highlightedRestaurantId={null}
      />
    </Wrapper>
  );
};

storiesOf('SidePanel', module).add('default', SidePanelStory);
