import React from 'react';
import PropTypes from 'prop-types';

import magnifyingGlass from 'assets/magnifying-glass.svg';
import LoadingSpinner from 'components/shared/LoadingSpinner';

import { LoadingWrapper, MagnifyingGlassImg, Button, Form, TextInput } from './style';

const SearchBar = ({ isLoading, onSubmit, searchText, onChange }) => (
  <Form onSubmit={onSubmit}>
    <TextInput
      type="text"
      onChange={onChange}
      placeholder="Search for a restaurant"
      value={searchText}
    />
    <Button isLoading={isLoading} disabled={isLoading} onClick={onSubmit}>
      {isLoading ? (
        <LoadingWrapper>
          <LoadingSpinner />
        </LoadingWrapper>
      ) : (
        <MagnifyingGlassImg src={magnifyingGlass} alt="Search here" />
      )}
    </Button>
  </Form>
);

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchBar;
