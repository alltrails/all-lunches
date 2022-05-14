import styled from 'styled-components';
import { colors } from 'styles';
import TransparentButton from 'styles/components/TransparentButton';

export const Form = styled.form`
  border: 1px solid ${colors.borderGray};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  width: 302px;
`;

export const TextInput = styled.input`
  outline: 0;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 1.1rem;
  padding-left: 8px;

  &::placeholder {
    color: ${colors.grayDark};
    font-weight: bold;
  }
`;

export const Button = styled(TransparentButton)`
  padding: 12px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MagnifyingGlassImg = styled.img`
  height: 20px;
`;
