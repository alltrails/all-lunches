import React from 'react';
import PropTypes from 'prop-types';

import { refType } from 'constants/propTypes';

import { FilterMenuButton, Wrapper } from './style';
import FilterMenuOptions from './FilterMenuOptions';

const Filter = ({
  isMenuOpen,
  filterButtonRef,
  onMenuOptionClick,
  onSubmit,
  selectedMenuOption,
  toggleMenuOpen,
}) => (
  <Wrapper>
    <FilterMenuButton ref={filterButtonRef} isMenuOpen={isMenuOpen} onClick={toggleMenuOpen}>
      {isMenuOpen ? 'Sort' : 'Filter'}
    </FilterMenuButton>
    {isMenuOpen && (
      <FilterMenuOptions
        filterButtonRef={filterButtonRef}
        onClose={() => toggleMenuOpen(true)}
        onMenuOptionClick={onMenuOptionClick}
        onSubmit={onSubmit}
        selectedMenuOption={selectedMenuOption}
      />
    )}
  </Wrapper>
);

Filter.propTypes = {
  filterButtonRef: refType,
  isMenuOpen: PropTypes.bool.isRequired,
  onMenuOptionClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedMenuOption: PropTypes.string,
  toggleMenuOpen: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  filterButtonRef: null,
  selectedMenuOption: null,
};

export default Filter;
