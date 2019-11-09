import {useState, useEffect} from "react";

import {getWindowDimensions, debounce} from "../../utils/index";

// Hook for retrieving current window dimensions
// Reference: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    /**
     * Updates window dimensions
     */
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    // Reference: https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
    const debouncedHandleResize = debounce(handleResize, 50);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return windowDimensions;
};
