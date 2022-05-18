import React from 'react';
import ReactDOM from 'react-dom';

import PopUpDialog from 'components/shared/PopUpDialog';

export const generatePopUp = ({ properties, coordinates }, mapContainer, popUpRef) => {
  const popupNode = document.createElement('div');

  ReactDOM.render(<PopUpDialog properties={properties} />, popupNode);
  popUpRef.current.setLngLat(coordinates).setDOMContent(popupNode).addTo(mapContainer);
};

export default generatePopUp;
