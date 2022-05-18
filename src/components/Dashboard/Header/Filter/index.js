import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as restaurantsActions from 'store/restaurants/actions';

import Filter from './Filter';

const mapDispatchToProps = {
  setFilterOption: restaurantsActions.setFilterOption,
};

const FilterContainer = ({ setFilterOption }) => {
  const filterButtonRef = useRef();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenuOption, setSelectedMenuOption] = useState(null);

  const handleMenuOptionClick = (menuOptionId) => {
    setSelectedMenuOption(menuOptionId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMenuOption) setFilterOption(selectedMenuOption);
  };

  return (
    <Filter
      isMenuOpen={isMenuOpen}
      filterButtonRef={filterButtonRef}
      onMenuOptionClick={handleMenuOptionClick}
      onSubmit={handleSubmit}
      selectedMenuOption={selectedMenuOption}
      toggleMenuOpen={() => setIsMenuOpen((isOpen) => !isOpen)}
    />
  );
};

FilterContainer.propTypes = {
  setFilterOption: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FilterContainer);
