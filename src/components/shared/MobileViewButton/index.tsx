import React from 'react';

import MapIcon from 'assets/map-icon.svg';
import ListIcon from 'assets/list-icon.svg';

import { Icon, Button } from './style';

type MobileViewButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isMapViewEnabled: boolean;
};

const MobileViewButton = ({ isMapViewEnabled, onClick }: MobileViewButtonProps) => {
  const buttonText = isMapViewEnabled ? 'List' : 'Map';
  const icon = isMapViewEnabled ? ListIcon : MapIcon;

  return (
    <Button onClick={onClick}>
      {buttonText}
      <Icon src={icon} alt="" />
    </Button>
  );
};

export default MobileViewButton;
