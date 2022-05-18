import styled from 'styled-components';
import TransparentButton from 'styles/components/TransparentButton';
import { colors, type } from 'styles';

export const CheckmarkIconWrapper = styled.div`
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid ${(p) => (!p.isSelected ? colors.borderGray : 'transparent')};
  margin-right: 8px;
`;

export const ApplyButton = styled(TransparentButton)`
  font-size: 1.2rem;
  font-weight: ${type.weight.bold};
  color: ${colors.green};
  margin-top: 8px;
  float: right;
  border-bottom: 2px solid transparent;

  &:disabled {
    color: ${colors.textLightGray};
    cursor: not-allowed;
  }

  &:hover,
  &.focus-visible {
    border-bottom: 2px solid ${colors.green};
  }
`;

export const Form = styled.form`
  width: 100%;
`;

export const MenuOptions = styled.div`
  background: white;
  border-radius: 10px;
  border: 1px solid ${colors.borderGray};
  box-shadow: 0 1px 3px rgb(0 0 0 / 20%), 0 1px 2px rgb(0 0 0 / 20%);
  padding: 12px;
  position: absolute;
  right: 13px;
  top: 39px;
  width: 200px;
`;

export const ListWrapper = styled.ol`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const OptionItemButton = styled(TransparentButton)`
  width: 100%;
  outline: none;
  color: ${colors.grayDark};
  font-size: 1.2rem;
  margin-bottom: 2px;

  &:hover,
  &.focus-visible {
    box-shadow: inset ${colors.green} 0px 0px 0px 2px;
    border-radius: 6px;
  }
`;

export const OptionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 6px;
  width: 100%;
  cursor: pointer;
`;
