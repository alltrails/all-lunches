import React from 'react';
import PropTypes from 'prop-types';

import Panel from './Panel';

export const PanelContainer = ({ onClose }) => <Panel onClose={onClose} />;

PanelContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PanelContainer;
