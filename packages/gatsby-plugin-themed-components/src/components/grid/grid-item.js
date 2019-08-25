import PropTypes from "prop-types";
/** @jsx jsx */
import {jsx} from "theme-ui";

GridItem.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
};

GridItem.defaultProps = {
  style: {},
};

/**
 * @param {object} props
 * @return {JSX}
 */
function GridItem({children, style}) {
  return (
    <div
      sx={{
        margin: "0.5rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default GridItem;
