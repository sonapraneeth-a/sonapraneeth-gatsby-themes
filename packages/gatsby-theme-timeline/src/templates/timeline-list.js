import React from "react";
import PropTypes from "prop-types";

import TimelinesListTemplate from "../components/templates/timeline-list";

/**
 *
 * @param {*} pageContext
 * @param {*} location
 * @return {JSX}
 */
function TimelinesListTemplateNode({pageContext: {timelines}}, location) {
  return <TimelinesListTemplate timelines={timelines} location={location} />;
}

TimelinesListTemplateNode.propTypes = {
  pageContext: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
};

TimelinesListTemplateNode.defaultProps = {};

export default TimelinesListTemplateNode;
