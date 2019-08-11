import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";

import {SMain} from "@sonapraneeth/base";
import {PageLayout} from "@sonapraneeth/base";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Project({data}) {
  console.log(data);
  return (
    <PageLayout location={data.project.slug} title={data.project.title}>
      <SMain>
        {data.project.completed_date}
        <MDXRenderer>{data.project.body}</MDXRenderer>
      </SMain>
    </PageLayout>
  );
}

Project.propTypes = {
  data: PropTypes.any.isRequired,
};

Project.defaultProps = {};

export default Project;

export const query = graphql`
  query ProjectQuery($id: String!) {
    project(id: { eq: $id }) {
      status
      start_date
      completed_date
      slug
      body
    }
  }
`;
