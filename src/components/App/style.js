import styled from 'styled-components';
import { media, colors } from 'styles';

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
  color: ${colors.black};
  margin: 0 0 20px 0;

  ${media.twoDimMin.tablet`font-size: 2.4rem;`}
`;
