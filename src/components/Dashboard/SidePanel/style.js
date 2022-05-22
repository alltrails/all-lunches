import styled from 'styled-components';
import { media, colors } from 'styles';
import TransparentButton from 'styles/components/TransparentButton';

export const PanelWrapper = styled.div`
  background: ${colors.whiteBackground};
  padding: 110px 14px 0;
  overflow-y: auto;
  height: 100vh;

  ${media.min.tablet`padding: 60px 14px 0;`}
`;

export const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const CardItem = styled.li`
  position: relative;
  background: white;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
  border-radius: 10px;
  list-style-type: none;
  padding: 15px;
  cursor: pointer;
  overflow: hidden;

  ${(p) =>
    p.isSelected &&
    `
    border: 2px solid ${colors.green};
  `}

  &.focus-visible {
    border: 2px solid ${colors.green};
  }
`;

export const FavoriteHeartWrapper = styled.div`
  position: absolute;
  top: 10%;
  right: 2%;
`;

export const FavoriteHeartButton = styled(TransparentButton)`
  position: relative;
`;
