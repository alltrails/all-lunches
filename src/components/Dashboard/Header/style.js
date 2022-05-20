import styled from 'styled-components';
import { media, colors } from 'styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 0;
  align-items: center;
  box-shadow: 0 4px 2px -2px rgb(0 0 0 / 10%), 0 1px 2px rgb(0 0 0 / 10%);
  background: ${colors.white};

  ${media.min.tablet`
    flex-direction: row;
    padding: 0 25px 0 25px;
    height: 60px;
    justify-content: space-between;
  `}
`;

export const Logo = styled.img`
  width: 270px;
`;

export const SearchFilterWapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 32px;
  margin-top: 14px;

  ${media.min.tablet`margin-top: 0;`}
`;
