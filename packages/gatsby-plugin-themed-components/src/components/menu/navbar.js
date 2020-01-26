/** @jsx jsx */
import {jsx, Styled, useThemeUI} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function Navbar({menuItems, ...props}) {
  const context = useThemeUI();
  const theme = context.theme;
  return (
    <div
      sx={{
        "display": "flex",
        "flexDirection": "row",
        "fontSize": "0.8rem",
        "bg": "text",
        "color": "background",
        "justifyContent": "center",
        "@media print": {
          display: "none",
        },
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
              key={"navbar-item-" + index}
              sx={{
                "bg": "inherit",
                "py": "0.5rem",
                "px": "1.5rem",
                "borderLeft": "0.01rem solid !important",
                "borderRight":
                  index === menuItems.length - 1 ?
                    "0.01rem solid !important" :
                    "",
                "color": `${theme.colors.background} !important`,
                "borderColor": "text",
                "borderBottom": "none",
                ":hover": {
                  color: `${theme.colors.text} !important`,
                  bg: "background",
                  borderBottom: "none",
                },
              }}
            >
              {menuItem.title}
            </Styled.a>
          )
        );
      })}
    </div>
  );
}

Navbar.propTypes = {
  menuItems: PropTypes.any.isRequired,
};

Navbar.defaultProps = {
  menuItems: [],
};

export default Navbar;
