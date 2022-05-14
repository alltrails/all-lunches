import styled from 'styled-components';
import TransparentButton from 'styles/components/TransparentButton';
import { colors } from 'styles';

export const Button = styled(TransparentButton)`
  height: 100%;
  width: 52px;
  margin-right: 16px;
  border: 1px solid ${colors.borderGray};
  border-radius: 6px;
  color: ${colors.baseGray};
  background: white;
  font-size: 1.2rem;
`;
