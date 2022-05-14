import styled from 'styled-components';
// import { media } from 'styles';

export const HeaderWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 25px 0 25px;
  box-shadow: 0 4px 2px -2px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 10%);
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const Logo = styled.img`
  width: 270px;
`;

export const SearchFilterWapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 32px;
`;
