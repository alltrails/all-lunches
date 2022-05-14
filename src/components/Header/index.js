import React from 'react';

import LogoPNG from 'assets/logo.png';

import Filter from './Filter';
import SearchBar from './SearchBar';

import { SearchFilterWapper, HeaderWrapper, Logo } from './style';

const Header = () => {
  console.log('test');

  return (
    <HeaderWrapper>
      <Logo alt="logo" src={LogoPNG} />
      <SearchFilterWapper>
        <Filter />
        <SearchBar />
      </SearchFilterWapper>
    </HeaderWrapper>
  );
};

export default Header;
