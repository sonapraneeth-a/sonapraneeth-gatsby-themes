import React from "react";
import PropTypes from "prop-types";
import {Chip} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} tags
 * @return {JSX}
 */
function TagList({tags}) {
  return (
    <>
      {tags.map((tag, index) => {
        return (
          tag !== null &&
          tag !== "" && (
            <Chip type={"tag"} key={"project-tag-" + index}>
              {tag}
            </Chip>
          )
        );
      })}
    </>
  );
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TagList.defaultProps = {
  tags: [""],
};

export default TagList;
