import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ onClose }) => <div>test</div>;

Panel.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Panel;
