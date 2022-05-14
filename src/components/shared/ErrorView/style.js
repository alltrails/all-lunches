import styled from 'styled-components';
import { colors, media, type } from 'styles';

export const ErrorViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 4;
  padding: 20%;
  background: ${colors.base} center;
`;

export const ErrorText = styled.div`
  font-size: 1.6rem;
  font-weight: ${type.weight.semiBold};
  text-align: center;
  white-space: pre-wrap;

  ${media.min.baseline`font-size: 2rem;`}
`;
