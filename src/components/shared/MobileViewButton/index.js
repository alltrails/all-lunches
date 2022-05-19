import React from 'react';
import PropTypes from 'prop-types';

import MapIcon from 'assets/map-icon.svg';
import ListIcon from 'assets/list-icon.svg';

import { Icon, Button } from './style';

const MobileViewButton = ({ isMapViewEnabled, onClick }) => {
  const buttonText = isMapViewEnabled ? 'Map' : 'List';
  const icon = isMapViewEnabled ? MapIcon : ListIcon;

  return (
    <Button onClick={onClick}>
      {buttonText}
      <Icon src={icon} alt="" />
    </Button>
  );
};

MobileViewButton.propTypes = {
  isMapViewEnabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MobileViewButton;
