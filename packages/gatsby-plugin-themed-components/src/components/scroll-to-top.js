/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
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

  const [visible, setVisible] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  // Reference: https://levelup.gitconnected.com/building-a-componentized-and-reusable-scroll-to-top-feature-in-react-7fa5ac8d4c2d
  // Reference: https://dev.to/guimg/hide-menu-when-scrolling-in-reactjs-47bj
  /**
   * Test
   *
   * @param {number} intervalId
   */
  function onScroll() {
    const prevScrollPos = scrollPos;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;
    setScrollPos(currentScrollPos);
    setVisible(visible);
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  if (visible === true) {
    return (
      <Button
        type={"primary"}
        aria-label={"Handle to scroll the webpage to top"}
        onClick={scrollToTop}
        sx={{
          "position": "fixed",
          "right": "50%",
          "bottom": 3,
          "width": "3rem",
          "height": "3rem",
          "borderRadius": "0.5rem",
          "border": "none",
          "@media print": {
            display: "none",
          },
          "zIndex": 1,
        }}
      >
        <span>
          <FaChevronUp />
        </span>
      </Button>
    );
  } else {
    return <></>;
  }
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
