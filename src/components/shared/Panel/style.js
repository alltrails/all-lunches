import styled from 'styled-components';
import { colors, type } from 'styles';

export const DialogContent = styled.div`
  width: 100%;
  max-width: 400px;
  color: ${colors.secondaryGray};
  padding: 20px 24px 30px;
`;

export const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: ${type.weight.semiBold};
  margin: 0;
  text-align: center;
  user-select: none;
`;

export const Content = styled.span`
  font-size: 1.4rem;
  margin: 20px 0;
  display: block;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 44px;
`;
