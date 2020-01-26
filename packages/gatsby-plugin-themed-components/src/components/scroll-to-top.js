/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import PropTypes from "prop-types";
import {FaChevronUp} from "react-icons/fa";
import Button from "../components/button";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function ScrollToTop({delayInMs, scrollStepInPx, ...props}) {
  // Reference: https://codepen.io/Qbrid/pen/GjVvwL
  // Reference: https://upmostly.com/tutorials/react-onclick-event-handling-with-examples#call-function-after-clicking-button
  // const [intervalId, setIntervalId] = useState(0);
  let intervalId = 0;

  /**
   * Test
   *
   */
  function scrollStep() {
    if (typeof window !== "undefined") {
      if (window.pageYOffset === 0) {
        clearInterval(intervalId);
      }
      window.scroll(0, window.pageYOffset - scrollStepInPx);
    }
  }

  /**
   * Test
   *
   * @param {number} intervalId
   */
  function scrollToTop() {
    const newIntervalId = setInterval(scrollStep, delayInMs);
    // setIntervalId(newIntervalId);
    intervalId = newIntervalId;
  }

  return (
    <Button
      type={"primary"}
      aria-label={"Handle to scroll the webpage to top"}
      onClick={scrollToTop}
      sx={{
        "position": "fixed",
        "right": 3,
        "bottom": 3,
        "width": "3rem",
        "height": "3rem",
        "borderRadius": "0.5rem",
        "border": "none",
        "@media print": {
          display: "none",
        },
      }}
    >
      <span>
        <FaChevronUp />
      </span>
    </Button>
  );
}

ScrollToTop.propTypes = {
  delayInMs: PropTypes.number,
  scrollStepInPx: PropTypes.number,
};

ScrollToTop.defaultProps = {
  delayInMs: 16.66,
  scrollStepInPx: 50,
};

export default ScrollToTop;
