import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { refType } from 'constants/propTypes';
import { useEventListener } from 'lib/customHooks';

import FilterMenu from './FilterMenu';

const FilterMenuContainer = ({
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
    <FilterMenu
      menuRef={menuRef}
      onMenuOptionClick={onMenuOptionClick}
      onSubmit={onSubmit}
      selectedMenuOption={selectedMenuOption}
    />
  );
};

FilterMenuContainer.propTypes = {
  filterButtonRef: refType,
  onMenuOptionClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  selectedMenuOption: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

FilterMenuContainer.defaultProps = {
  filterButtonRef: null,
  selectedMenuOption: null,
};

export default FilterMenuContainer;
