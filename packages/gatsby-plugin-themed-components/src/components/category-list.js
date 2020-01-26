/** @jsx jsx */
import {jsx} from "@sonapraneeth/gatsby-plugin-themed-components";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Chip} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} categories
 * @return {JSX}
 */
function CategoryList({categories}) {
  return (
    <>
      {categories.map((category, index) => {
        return (
          category !== null &&
          category !== "" && (
            <Chip
              type={"category"}
              key={"project-category-" + index}
              sx={{
                mx: "0.1rem",
              }}
            >
              {category}
            </Chip>
          )
        );
      })}
    </>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CategoryList.defaultProps = {
  categories: [""],
};

export default CategoryList;
