import React from "react";
import PropTypes from "prop-types";

import {PageLayout} from "@sonapraneeth/base";
import HomeWidget from "@sonapraneeth/bio/src/widget/home";
import ProjectWidget from "@sonapraneeth/projects/src/widget/projects";
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
      <HomeWidget author={home.authorInfo} details={home.mdx} />
      <ProjectWidget projects={projects} />
      <BlogWidget blogs={blogs} />
    </PageLayout>
  );
}

export default HomeLayout;
