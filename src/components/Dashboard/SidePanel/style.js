import styled from 'styled-components';
import { colors } from 'styles';
import TransparentButton from 'styles/components/TransparentButton';

export const PanelWrapper = styled.div`
  background: ${colors.whiteBackground};
  padding: 60px 14px 0;
  overflow-y: auto;
  height: 100vh;
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
`;

export const FavoriteHeartButton = styled(TransparentButton)`
  position: absolute;
  top: 10%;
  right: 2%;
`;
