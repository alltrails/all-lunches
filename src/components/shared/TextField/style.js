import styled from 'styled-components';

import { colors, type } from 'styles';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: ${({ hasError, theme }) =>
    hasError
      ? `1px solid ${theme.container.border.error}`
      : `1px solid ${theme.container.border.default}`};
  background: ${({ theme }) => theme.container.background};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  height: 26px;
  background-color: transparent;
  font-size: 1.4rem;
  border: 0;
  color: ${({ theme }) => theme.input.color.default};
  font-weight: ${type.weight.semiBold};
  outline: 0;
  box-shadow: none;
  &:disabled {
    font-style: italic;
  }

  /* Remove X button (clear field) from IE and Edge */
  &::-ms-clear {
    display: none;
  }
`;

export const TelephoneText = styled.div`
  font-size: 1.4rem;
  color: ${colors.tertiaryGray};
  box-shadow: 0.5px 0px 0px #aeaeae;
  border-radius: 2px 0px 0px 2px;
  margin-right: 8px;
  padding-right: 8px;
`;
