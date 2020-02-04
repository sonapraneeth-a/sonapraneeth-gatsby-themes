/** @jsx jsx */
import {jsx, Styled} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import {FaAngleDoubleDown} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function UpToDownCurtain({menuItems, ...props}) {
  const [display, setDisplay] = useState(false);
  const upCurtainStatus = display;
  // Reference: https://theme-ui.com/recipes/color-mode-switcher
  // Fixes warning: A form label must be associated with a control
  const toggleUpToDownCurtain = (e) => {
    setDisplay(!upCurtainStatus);
  };
  // Reference: https://codepen.io/dodozhang21/pen/siKtp
  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label={"Handle to bring down menu for the webpage"}
        sx={{
          "zIndex": 100,
          "position": "fixed",
          "cursor": "pointer",
          "top": "2.1rem",
          "left": "0.8rem",
          "transition": "all 0.3s ease-in-out",
          "@media print": {
            display: "none",
          },
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateY(0)",
            },
            "40%": {
              transform: "translateY(-30px)",
            },
            "60%": {
              transform: "translateY(-15px)",
            },
          },
          "animation": "bounce 2s infinite linear",
        }}
        onClick={toggleUpToDownCurtain}
        onKeyDown={toggleUpToDownCurtain}
      >
        <FaAngleDoubleDown
          sx={{
            color: "text",
            fontSize: 9,
          }}
        />
      </div>
      {/* Reference: https://mxstbr.com/thoughts/gatsby */}
      <div
        sx={{
          zIndex: 10000,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          top: display === true ? "0%" : "-100%",
          transition: "all 0.3s ease-in-out", // cubic-bezier(0, 1, 0.5, 1)",
          transform: display === true ? "translateY(0%)" : "translateY(-100%)",
          bg: "background",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={
            "Handle to open/close menu for the webpage " +
            "based on current status"
          }
          sx={{
            position: "fixed",
            zIndex: 100,
            cursor: "pointer",
            top: "2.1rem",
            right: "0.8rem",
          }}
          onClick={toggleUpToDownCurtain}
          onKeyDown={toggleUpToDownCurtain}
        >
          <IoMdClose
            sx={{
              color: "text",
              fontSize: 9,
            }}
          />
        </div>
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "1.125rem",
            height: "100%",
            justifyContent: "center",
          }}
        >
          {menuItems.map((menuItemNode, index) => {
            const menuItem = menuItemNode.node;
            return (
              menuItem !== undefined &&
              menuItem !== null &&
              JSON.stringify(menuItem) !== "{}" && (
                <Styled.a
                  as={Link}
                  to={menuItem.url}
                  rel="noopener noreferrer"
                  style={{borderBottom: "none"}}
                  aria-label={menuItem.title}
                  key={"sidebar-item-" + index}
                  sx={{
                    bg: "inherit",
                    py: "0.5rem",
                    px: "1.5rem",
                    borderBottom: "0.01rem solid !important",
                    borderColor: "muted",
                  }}
                >
                  {menuItem.title}
                </Styled.a>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

UpToDownCurtain.propTypes = {
  menuItems: PropTypes.any.isRequired,
};

UpToDownCurtain.defaultProps = {
  menuItems: [],
};

export default UpToDownCurtain;
