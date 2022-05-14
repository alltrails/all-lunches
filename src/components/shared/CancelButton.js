import styled from 'styled-components';
import { colors, type } from 'styles';
import TransparentButton from 'styles/components/TransparentButton';

const CancelButton = styled(TransparentButton)`
  color: ${colors.gray};
  margin-right: 30px;
  font-weight: ${type.weight.semiBold};
  font-size: 1.4rem;
  outline: none;
  border-bottom: 2px solid transparent;

  &:hover,
  &.focus-visible {
    border-bottom: 2px solid ${colors.lightBlue};
  }
`;

export default CancelButton;
