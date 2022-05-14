import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'styles/colors';

const variantColors = {
  gray: colors.gray,
  white: colors.base,
};

const PopupWrapper = styled.div`
  position: relative;
  background-color: ${({ variantColor }) => variantColors[variantColor]};
  border-radius: 20px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1), 0 3px 12px rgba(0, 0, 0, 0.1);

  ${({ arrowHorizontalLocation, arrowVerticalLocation, showArrow, variantColor }) =>
    showArrow &&
    `
    &:before {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      border-radius: 5px;
      background-color: ${variantColors[variantColor]};
      transform: rotate(45deg);

      ${arrowHorizontalLocation === 'left' ? 'left: 34px;' : 'right: 34px;'}
      ${arrowVerticalLocation === 'bottom' ? 'bottom: -10px;' : 'top: -10px;'}
    }
  `}
`;

PopupWrapper.propTypes = {
  arrowHorizontalLocation: PropTypes.string,
  arrowVerticalLocation: PropTypes.string,
  showArrow: PropTypes.bool,
  variantColor: PropTypes.oneOf(['white', 'gray']),
};

PopupWrapper.defaultProps = {
  arrowHorizontalLocation: 'left',
  arrowVerticalLocation: 'bottom',
  showArrow: false,
  variantColor: 'white',
};

export default PopupWrapper;
