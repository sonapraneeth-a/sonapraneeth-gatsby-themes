import React from "react";
import PropTypes from "prop-types";
import {graphql} from "gatsby";
import {MDXRenderer} from "gatsby-plugin-mdx";

import {SContainer, Styled} from "@sonapraneeth/base";
import {BaseLayout, Chip} from "@sonapraneeth/base";
// import TableOfContents from "../components/toc";

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Project({data, location}) {
  console.log(data);
  return (
    <BaseLayout location={data.project.slug} title={""}>
      <SContainer>
        <Styled.h1>{data.project.title}</Styled.h1>
        <Chip type={"date"}>{data.project.completed_date}</Chip>
        <hr />
        <section>
          {/* <TableOfContents
            tableOfContents={data.project.tableOfContents}
            location={location}
          />*/}
          <MDXRenderer>{data.project.body}</MDXRenderer>
        </section>
      </SContainer>
    </BaseLayout>
  );
}

Project.propTypes = {
  data: PropTypes.any.isRequired,
  location: PropTypes.any,
};

Project.defaultProps = {};

export default Project;

export const query = graphql`
  query ProjectQuery($id: String!) {
    project(id: { eq: $id }) {
      title
      status
      start_date
      completed_date
      slug
      body
    }
  }
`;
