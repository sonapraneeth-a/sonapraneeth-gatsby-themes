import PropTypes from "prop-types";
/** @jsx jsx */
import {jsx} from "theme-ui";

GridItem.propTypes = {
  children: PropTypes.any.isRequired,
  css: PropTypes.any,
};

GridItem.defaultProps = {
  css: {},
};

/**
 * @param {object} props
 * @return {JSX}
 */
function GridItem({children, css}) {
  return (
    <div
      sx={{
        margin: "0.5rem",
        ...css,
      }}
    >
      {children}
    </div>
  );
}

export default GridItem;
