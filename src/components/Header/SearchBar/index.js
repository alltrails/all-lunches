import React from 'react';

import magnifyingGlass from 'assets/magnifying-glass.svg';
import { MagnifyingGlassImg, Button, Form, TextInput } from './style';

const SearchBar = () => {
  console.log('test');

  return (
    <Form onSubmit={() => {}}>
      <TextInput type="text" onChange={() => {}} placeholder="Search for a restaurant" value="" />
      <Button>
        <MagnifyingGlassImg src={magnifyingGlass} alt="Search here" />
      </Button>
    </Form>
  );
};

export default SearchBar;
