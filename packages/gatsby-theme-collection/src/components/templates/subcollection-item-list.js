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
function SubCollectionItemsListTemplate({
  collectionItems,
  subCollectionName,
  location,
}) {
  const siteMeta = useSiteMetadata();
  const title = "SubCollectionItems penned by " + siteMeta.author;
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
        <Styled.h1>{subCollectionName}</Styled.h1>
        <Grid noCols={1}>
          {collectionItems.map((collectionItem, index) => {
            if (
              process.env.NODE_ENV !== "production" ||
              (process.env.NODE_ENV === "production" &&
                collectionItem.draft === false)
            ) {
              return (
                <GridItem key={`collection-detailed-${index}`}>
                  <DetailedCollectionItemCard
                    collectionName={subCollectionName}
                    collectionItem={collectionItem}
                  />
                </GridItem>
              );
            } else {
              return <></>;
            }
          })}
        </Grid>
      </SContainer>
    </PageLayout>
  );
}

SubCollectionItemsListTemplate.propTypes = {
  subCollectionName: PropTypes.any.isRequired,
  collectionItems: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

SubCollectionItemsListTemplate.defaultProps = {};

export default SubCollectionItemsListTemplate;
