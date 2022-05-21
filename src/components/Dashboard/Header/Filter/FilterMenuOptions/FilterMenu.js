import React from 'react';
import PropTypes from 'prop-types';

import { refType } from 'constants/propTypes';
import * as FilterTypes from 'constants/filterTypes';

import CheckmarkIcon from 'components/svg/CheckmarkIcon';
import FocusTrap from 'components/shared/FocusTrap';
import {
  ApplyButton,
  CheckmarkIconWrapper,
  Form,
  ListWrapper,
  OptionItem,
  OptionItemButton,
  Options,
} from './style';

const menuOptions = [
  { id: FilterTypes.HIGH_TO_LOW_FILTER_OPTION, title: 'Ratings High to Low' },
  { id: FilterTypes.LOW_TO_HIGH_FILTER_OPTION, title: 'Ratings Low to High' },
];

const FilterMenu = ({ menuRef, onMenuOptionClick, onSubmit, selectedMenuOption }) => (
  <FocusTrap fallbackFocus="#pop-out-menu">
    <Options ref={menuRef} tabIndex="-1" id="pop-out-menu">
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
    </Options>
  </FocusTrap>
);
FilterMenu.propTypes = {
  menuRef: refType,
  onMenuOptionClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedMenuOption: PropTypes.string,
};

FilterMenu.defaultProps = {
  menuRef: null,
  selectedMenuOption: null,
};

export default FilterMenu;
