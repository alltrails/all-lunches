import styled from 'styled-components';
import { colors } from 'styles';

export const Wrapper = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 25px;
  box-shadow: 0 4px 2px -2px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 10%);
  background: ${colors.white};
`;

export const Logo = styled.img`
  width: 270px;
`;

export const SearchFilterWapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 32px;
`;
