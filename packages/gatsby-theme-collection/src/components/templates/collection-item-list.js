import React from "react";
import PropTypes from "prop-types";

import {
  PageLayout,
  Styled,
} from "@sonapraneeth/gatsby-plugin-themed-components";
import DetailedCollectionItemCard from "../card/detailed";
import {
  Grid,
  GridItem,
  SContainer,
  useSiteMetadata,
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function CollectionItemsListTemplate({
  collectionItems,
  collectionName,
  location,
}) {
  const siteMeta = useSiteMetadata();
  const title = "CollectionItems penned by " + siteMeta.author;
  const description =
    "This is the blogs page of " +
    siteMeta.author +
    ". " +
    "You can find summarized information about all blogs in this page";
  const meta = {
    title: title,
    description: description,
  };
  return (
    <PageLayout location={location} meta={meta}>
      <SContainer>
        <Styled.h1>{collectionName}</Styled.h1>
        <Grid noCols={1}>
          {collectionItems.map((collectionItem, index) => (
            <GridItem key={`blog-detailed-${index}`}>
              <DetailedCollectionItemCard
                collectionName={collectionName}
                collectionItem={collectionItem}
              />
            </GridItem>
          ))}
        </Grid>
      </SContainer>
    </PageLayout>
  );
}

CollectionItemsListTemplate.propTypes = {
  collectionName: PropTypes.any.isRequired,
  collectionItems: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

CollectionItemsListTemplate.defaultProps = {};

export default CollectionItemsListTemplate;
