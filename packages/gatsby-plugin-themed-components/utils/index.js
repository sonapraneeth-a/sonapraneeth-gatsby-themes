module.exports = {
  getWindowDimensions: function() {
    if (typeof window !== "undefined") {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      const height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

      return {
        height,
        width,
      };
    }

    return {
      width: 0,
      height: 0,
    };
  },

  // Reference: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
  debounce: function(fn, ms) {
    let timer;
    return (_) => {
      const context = this;
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout((_) => {
        timer = null;
        fn.apply(context, args);
      }, ms);
    };
  },
};
