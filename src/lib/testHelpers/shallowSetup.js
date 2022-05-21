/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';

export default (Component, defaultProps) =>
  (otherProps = {}) => {
    const props = { ...defaultProps, ...otherProps };
    const wrapper = shallow(<Component {...props} />);

    return { props, wrapper };
  };
