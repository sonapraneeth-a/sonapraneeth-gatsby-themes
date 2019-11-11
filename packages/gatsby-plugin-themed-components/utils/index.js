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

  padZeros: function(object, length) {
    const objectAsString = object.toString();
    let zeros = "";
    const zerosLength =
      length > objectAsString.length ? length - objectAsString.length : 0;
    for (let index = 0; index < zerosLength; index++) {
      zeros += "0";
    }
    return zeros + objectAsString;
  },

  getFormattedDate: function(date) {
    const jsDate = new Date(date);
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedJSDate =
      `${module.exports.padZeros(jsDate.getDate(), 2)} ` +
      `${month[jsDate.getMonth()]} ` +
      `${jsDate.getFullYear()}`;
    return formattedJSDate;
  },
};
