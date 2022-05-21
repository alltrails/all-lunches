import styled from 'styled-components';
import TransparentButton from 'styles/components/TransparentButton';
import { type, colors } from 'styles';

export const Button = styled(TransparentButton)`
  position: fixed;
  display: flex;
  align-items: center;
  left: 50%;
  bottom: 3%;
  transform: translate(-50%, -50%);
  background: ${colors.green};
  color: ${colors.white};
  border-radius: 6px;
  padding: 10px 25px;
  box-shadow: 2px 3px 3px rgb(0 0 0 / 30%), 0 1px 2px rgb(0 0 0 / 30%);
  font-weight: ${type.weight.bold};
`;

export const Icon = styled.img`
  height: 16px;
  margin-left: 12px;
`;
