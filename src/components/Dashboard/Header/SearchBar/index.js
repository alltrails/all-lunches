import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isLoadingSelector } from 'store/restaurants/selectors';
import * as restaurantsActions from 'store/restaurants/actions';

import SearchBar from './SearchBar';

const mapStateToProps = (state) => ({
  isLoading: isLoadingSelector(state),
});

const mapDispatchToProps = {
  queryArea: restaurantsActions.queryArea,
};

export const SearchBarContainer = ({ isLoading, queryArea }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchTextTrimmed = searchText.trim();

    if (searchTextTrimmed) queryArea(searchTextTrimmed);
  };

  return (
    <SearchBar
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onChange={handleChange}
      searchText={searchText}
    />
  );
};

SearchBarContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  queryArea: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
