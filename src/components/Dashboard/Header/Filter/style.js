import styled from 'styled-components';
import TransparentButton from 'styles/components/TransparentButton';
import { colors } from 'styles';

export const Wrapper = styled.div`
  position: relative;
`;

export const FilterMenuButton = styled(TransparentButton)`
  background: ${(p) => (p.isMenuOpen ? colors.green : colors.white)};
  font-size: 1.2rem;
  padding: 0 14px;
  color: ${(p) => (p.isMenuOpen ? colors.white : colors.grayDark)};
  border: 1px solid ${colors.borderGray};
  border-radius: 6px;
  margin-right: 16px;
  height: 100%;
  min-width: 58px;

  &.focus-visible,
  &:hover {
    border: 1px solid ${colors.green};
    border-radius: 6px;
  }
`;
