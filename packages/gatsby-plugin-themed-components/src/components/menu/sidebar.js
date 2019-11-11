/** @jsx jsx */
import {jsx, Styled} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React, {useContext} from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import // FaBars,
// FaTimes,
"react-icons/fa";
import {IoMdApps} from "react-icons/io";
import {SidebarContext} from "../../context/sidebar";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function SidebarMenu({menuItems, toggleSidebarDisplay, ...props}) {
  // Reference: https://www.youtube.com/watch?v=lhMKvyLRWo0
  const {type, display, width, unit} = useContext(SidebarContext);
  const additionalSidebarCSS = {
    transform: display === true ? `translateX(${width}${unit})` : "",
    left: type === "push" ? `-${width}${unit}` : "0rem",
  };
  const additionalSidebarToggleCSS = {
    transform: display === true ? `translateX(${width}${unit})` : "",
  };
  return (
    <div
      sx={{
        bg: "sidebar.bg",
        color: "text",
      }}
    >
      {type === "push" && (
        <label
          sx={{
            zIndex: 100,
            position: "fixed",
            cursor: "pointer",
            // top: "2.3rem",
            // left: "1.2rem",
            top: "2.1rem",
            left: "0.8rem",
            transition: "all 0.3s ease-in-out",
            ...additionalSidebarToggleCSS,
          }}
          onClick={toggleSidebarDisplay}
        >
          {display === false && (
            <IoMdApps
              sx={{
                color: "text",
                // fontSize: 6,
                fontSize: 9,
              }}
            />
          )}
          {display === true && (
            <IoMdApps
              sx={{
                color: "text",
                // fontSize: 6,
                fontSize: 9,
              }}
            />
          )}
        </label>
      )}
      <aside
        sx={{
          position: "fixed",
          width: `${width}${unit}`,
          height: "100%",
          top: 0,
          bottom: 0,
          overflowY: "auto",
          transition: "all 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          borderRight: "0.2rem solid",
          borderColor: "text",
          ...additionalSidebarCSS,
        }}
      >
        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            fontSize: "1.125rem",
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
      </aside>
    </div>
  );
}

SidebarMenu.propTypes = {
  menuItems: PropTypes.any.isRequired,
  toggleSidebarDisplay: PropTypes.func.isRequired,
};

SidebarMenu.defaultProps = {
  menuItems: [],
};

export default SidebarMenu;
