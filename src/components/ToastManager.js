import { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import toast from 'react-hot-toast';

import { currentOpenToastSelector } from 'store/ui/selectors';

const mapStateToProps = (state) => ({
  currentToast: currentOpenToastSelector(state),
});

export const ToastManager = ({ currentToast }) => {
  useEffect(() => {
    if (currentToast) {
      const { message, type } = currentToast;
      toast[type](message);
    }
  }, [currentToast]);

  return null;
};

ToastManager.propTypes = {
  currentToast: PropTypes.objectOf(PropTypes.string),
};

ToastManager.defaultProps = {
  toast: null,
};

export default connect(mapStateToProps)(ToastManager);
