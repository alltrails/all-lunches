import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { refType } from 'constants/propTypes';
import * as Types from 'constants/filterTypes';

import { useEventListener } from 'lib/customHooks';

import CheckmarkIcon from 'components/svg/CheckmarkIcon';
import FocusTrap from 'components/shared/FocusTrap';
import {
  ApplyButton,
  CheckmarkIconWrapper,
  Form,
  ListWrapper,
  MenuOptions,
  OptionItem,
  OptionItemButton,
} from './style';

const menuOptions = [
  { id: Types.HIGH_TO_LOW_FILTER_OPTION, title: 'Ratings High to Low' },
  { id: Types.LOW_TO_HIGH_FILTER_OPTION, title: 'Ratings Low to High' },
];

const FilterMenuOptions = ({
  filterButtonRef,
  onClose,
  onMenuOptionClick,
  onSubmit,
  selectedMenuOption,
}) => {
  const menuRef = useRef();

  const handleMouseDown = ({ target }) => {
    const shouldCloseMenu =
      !menuRef.current?.contains(target) && !filterButtonRef.current?.contains(target);

    if (shouldCloseMenu) onClose();
  };

  useEventListener('mousedown', handleMouseDown);

  return (
    <FocusTrap fallbackFocus="#pop-out-menu">
      <MenuOptions ref={menuRef} tabIndex="-1" id="pop-out-menu">
        <Form>
          <ListWrapper>
            {menuOptions.map((option) => {
              const isSelected = selectedMenuOption === option.id;

              return (
                <OptionItemButton
                  key={option.id}
                  onClick={() => onMenuOptionClick(option.id)}
                  type="button"
                >
                  <OptionItem>
                    <CheckmarkIconWrapper isSelected={isSelected}>
                      <CheckmarkIcon
                        titleText={option.title}
                        variant={isSelected ? 'green' : 'white'}
                      />
                    </CheckmarkIconWrapper>
                    {option.title}
                  </OptionItem>
                </OptionItemButton>
              );
            })}
          </ListWrapper>
          <ApplyButton disabled={!selectedMenuOption} onClick={onSubmit}>
            Apply
          </ApplyButton>
        </Form>
      </MenuOptions>
    </FocusTrap>
  );
};

FilterMenuOptions.propTypes = {
  filterButtonRef: refType,
  onMenuOptionClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedMenuOption: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

FilterMenuOptions.defaultProps = {
  filterButtonRef: null,
  selectedMenuOption: null,
};

export default FilterMenuOptions;
