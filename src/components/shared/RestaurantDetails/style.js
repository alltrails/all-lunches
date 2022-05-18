import styled from 'styled-components';
import { colors, type } from 'styles';

export const HyperLinkWrapper = styled.a`
  text-decoration: none;
  outline: none;
  display: flex;
  flex-direction: row;
  text-decoration: none;
`;

export const PlaceImage = styled.img`
  width: 65px;
  height: 65px;
  margin-right: 10px;
`;

export const MetadataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Title = styled.div`
  color: ${colors.grayDark};
  font-size: 1.4rem;
  font-weight: ${type.weight.bold};
  padding-right: 6px;
`;

export const RatingStarsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const StarIconWrapper = styled.i`
  margin-right: 2px;
`;

export const PriceLevelWrapper = styled.div`
  font-size: 1.2rem;
  color: ${colors.textLightGray};
  text-transform: capitalize;
`;

export const UserRatingsTotalText = styled.span`
  font-size: 1.2rem;
  color: ${colors.spanLightGray};
  margin-left: 5px;
`;
