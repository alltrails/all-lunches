import React from 'react';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';

import { restaurantMock } from '__mocks__';

import colors from 'styles/colors';
import RestaurantDetails from '../index';

const Wrapper = styled.div`
  background-color: ${colors.white};
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RestaurantDetailsStory = () => (
  <Wrapper>
    <RestaurantDetails
      name={restaurantMock.name}
      photoUrl={restaurantMock.photoUrl}
      placeUrl={restaurantMock.placeUrl}
      priceLevel={restaurantMock.priceLevel}
      rating={restaurantMock.rating}
      supportingText={restaurantMock.supportingText}
      userRatingsTotal={restaurantMock.userRatingsTotal}
    />
  </Wrapper>
);

storiesOf('RestaurantDetails', module).add('default', RestaurantDetailsStory);
