// Borrowed from https://davidwalsh.name/javascript-debounce-function

const debounce = (fn, wait) => {
  let timeout;

  return function debouncedFn(...args) {
    const context = this;

    const later = () => {
      timeout = null;
      fn.apply(context, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
