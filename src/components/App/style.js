import styled from 'styled-components';
import { media } from 'styles';

export const Wrapper = styled.div`
  position: relative;
  height: 100vh;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

export const LoadingTitle = styled.h3`
  font-size: 2.2rem;
  color: #626262;
  margin: 0 0 20px 0;

  ${media.twoDimMin.tablet`font-size: 2.4rem;`}
`;
