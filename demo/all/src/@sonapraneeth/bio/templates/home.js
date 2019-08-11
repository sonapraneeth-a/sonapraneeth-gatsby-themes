import React from "react";
import PropTypes from "prop-types";

import {PageLayout, Styled, SContainer} from "@sonapraneeth/base";
import HomeWidget from "@sonapraneeth/bio/src/widget/home";
import ProjectWidget from "@sonapraneeth/project/src/widget/projects";
import BlogWidget from "@sonapraneeth/blog/src/widget/blogs";

import {useHome} from "../../../hooks/useHome";
import {useProjects} from "../../../hooks/useProjects";
import {useBlogs} from "../../../hooks/useBlogs";

HomeLayout.propTypes = {
  location: PropTypes.any.isRequired,
};

HomeLayout.defaultProps = {};

/**
 * Home layout - Used in home page
 * @return {JSX} Rendered children for the HomeLayout
 */
function HomeLayout({location}) {
  console.log("Shadowed");
  const home = useHome();
  const projects = useProjects();
  const blogs = useBlogs();
  return (
    <PageLayout title={""} description={""} location={location}>
      <div>
        <SContainer>
          <Styled.h1>About</Styled.h1>
          <HomeWidget author={home.authorInfo} details={home.mdx} />
        </SContainer>
      </div>
      <div>
        <SContainer>
          <Styled.h1>Projects</Styled.h1>
          <ProjectWidget projects={projects} />
        </SContainer>
      </div>
      <div>
        <SContainer>
          <Styled.h1>Blog</Styled.h1>
          <BlogWidget blogs={blogs} />
        </SContainer>
      </div>
    </PageLayout>
  );
}

export default HomeLayout;
