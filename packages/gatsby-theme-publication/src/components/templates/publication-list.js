import React from "react";
import PropTypes from "prop-types";

import {
  PageLayout,
  Styled,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import {
  SContainer,
  useSiteMetadata,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import Publication from "../publication";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function PublicationsListTemplate({publications, location}) {
  const siteMeta = useSiteMetadata();
  const title = "Publications done by " + siteMeta.author;
  const description =
    "This is the publications page of " +
    siteMeta.author +
    ". " +
    "You can find summarized information about all publications in this page";
  const meta = {
    title: title,
    description: description,
  };
  return (
    <PageLayout location={location} meta={meta}>
      <SContainer>
        <Styled.h1>{"Publications"}</Styled.h1>
        {publications.map((publication, index) => (
          <Publication
            key={"publication" + index}
            publication={publication.node}
          />
        ))}
      </SContainer>
    </PageLayout>
  );
}

PublicationsListTemplate.propTypes = {
  publications: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

PublicationsListTemplate.defaultProps = {};

export default PublicationsListTemplate;
