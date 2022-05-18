import React from 'react';

import LogoPNG from 'assets/logo.png';

import Filter from './Filter';
import SearchBar from './SearchBar';

import { SearchFilterWapper, Wrapper, Logo } from './style';

const Header = () => (
  <Wrapper>
    <Logo alt="logo" src={LogoPNG} />
    <SearchFilterWapper>
      <Filter />
      <SearchBar />
    </SearchFilterWapper>
  </Wrapper>
);

export default Header;
