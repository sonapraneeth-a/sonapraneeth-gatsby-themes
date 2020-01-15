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
  const toggleUpToDownCurtain = (e) => {
    setDisplay(!upCurtainStatus);
  };
  console.log(display);
  return (
    <>
      <label
        sx={{
          zIndex: 100,
          position: "fixed",
          cursor: "pointer",
          top: "2.1rem",
          left: "0.8rem",
          transition: "all 0.3s ease-in-out",
        }}
        onClick={toggleUpToDownCurtain}
      >
        <FaAngleDoubleDown
          sx={{
            color: "text",
            fontSize: 9,
          }}
        />
      </label>
      <div
        sx={{
          zIndex: 10000,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: display === true ? "0%" : "-100%",
          transition: "all 0.3s cubic-bezier(0, 1, 0.5, 1)", // ease-in-out",
          transform: display === true ? "translateY(0%)" : "translateY(-100%)",
          bg: "background",
        }}
      >
        <label
          sx={{
            position: "fixed",
            zIndex: 100,
            cursor: "pointer",
            top: "2.1rem",
            right: "0.8rem",
          }}
          onClick={toggleUpToDownCurtain}
        >
          <IoMdClose
            sx={{
              color: "text",
              fontSize: 9,
            }}
          />
        </label>
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
