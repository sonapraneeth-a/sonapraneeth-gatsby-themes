/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";

import {
  Card,
  CardContent,
  CardFooter,
  Styled,
  SFlex,
  FaReadme,
  FaClock,
  TagList,
  CategoryList,
  // Chip,
  // getFormattedDate,
} from "@sonapraneeth/gatsby-plugin-themed-components";

/**
 *
 * @param {*} children
 * @return {JSX}
 */
function DetailedCollectionItemCard({collectionItem, ...props}) {
  const timeToRead =
    collectionItem.timeToRead === null ? "~1" : collectionItem.timeToRead;
  // const publishedDate = getFormattedDate(collectionItem.publishedDate);
  return (
    <Card>
      <CardContent>
        <SFlex
          sx={{
            flexDirection: "column",
          }}
        >
          <Styled.h2>{collectionItem.title}</Styled.h2>
          <SFlex
            sx={{
              flexDirection: "row",
            }}
          >
            {/* <Chip type={"date"}>
              <b>Published:</b> {publishedDate}
          </Chip>*/}
            <TagList tags={collectionItem.tags} />
            <CategoryList categories={collectionItem.categories} />
          </SFlex>
          {/* <p>{collectionItem.excerpt}</p>*/}
        </SFlex>
      </CardContent>
      <CardFooter>
        <SFlex
          sx={{
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <Styled.a
            as={Link}
            to={collectionItem.slug}
            sx={{
              "variant": "link.none",
              "bg": "surface",
              ":hover": {
                bg: "surface",
                color: "text",
              },
              "display": "inline-block",
            }}
          >
            <FaReadme
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />
            <span
              sx={{
                verticalAlign: "middle",
                mx: "0.2rem",
              }}
            >
              Continue Reading ...
            </span>
          </Styled.a>
          <p
            sx={{
              m: 0,
            }}
          >
            <FaClock
              sx={{
                display: "inline-block",
                verticalAlign: "middle",
              }}
            />
            <span
              sx={{
                verticalAlign: "middle",
                mx: "0.2rem",
              }}
            >
              {timeToRead} min. read
            </span>
          </p>
        </SFlex>
      </CardFooter>
    </Card>
  );
}

DetailedCollectionItemCard.propTypes = {
  collectionItem: PropTypes.any.isRequired,
};

DetailedCollectionItemCard.defaultProps = {};

export default DetailedCollectionItemCard;
