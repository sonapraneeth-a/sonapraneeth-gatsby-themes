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

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function TimelinesListTemplate({timelines, location}) {
  const siteMeta = useSiteMetadata();
  const title = "Timelines done by " + siteMeta.author;
  const description =
    "This is the timelines page of " +
    siteMeta.author +
    ". " +
    "You can find summarized information about all timelines in this page";
  const meta = {
    title: title,
    description: description,
  };
  return (
    <PageLayout location={location} meta={meta}>
      <SContainer>
        <Styled.h1>{"Timeline"}</Styled.h1>
        <ul>
          {timelines.map((timeline, idx1) => (
            <>
              <li>{timeline.node.institution}</li>
              {timeline.node.positions.map((position, idx2) => (
                <ol key={"timeline-pos" + idx2}>
                  <li>{position.title}</li>
                  <li>{position.startDate}</li>
                  <li>{position.endDate}</li>
                  <li>{position.place}</li>
                </ol>
              ))}
            </>
          ))}
        </ul>
      </SContainer>
    </PageLayout>
  );
}

TimelinesListTemplate.propTypes = {
  timelines: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

TimelinesListTemplate.defaultProps = {};

export default TimelinesListTemplate;
