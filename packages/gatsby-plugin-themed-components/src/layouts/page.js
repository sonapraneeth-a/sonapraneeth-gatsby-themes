import React from "react";
import PropTypes from "prop-types";
import {Styled} from "theme-ui";

import BaseLayout from "./base";

/**
 * Page layout for pages
 * @return {JSX} Rendered children for the page
 */
function PageLayout({meta, pageTitle, location, children}) {
  const {title, description} = meta;
  return (
    <BaseLayout title={title} description={description} location={location}>
      {pageTitle !== null && pageTitle !== "" && (
        <Styled.h1>
          <span>{pageTitle}</span>
        </Styled.h1>
      )}
      <section>{children}</section>
    </BaseLayout>
  );
}

export default PageLayout;

PageLayout.propTypes = {
  children: PropTypes.any.isRequired,
  pageTitle: PropTypes.string,
  meta: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  location: PropTypes.any.isRequired,
};

PageLayout.defaultProps = {
  meta: {
    title: "",
    description: "",
  },
  pageTitle: "",
};
