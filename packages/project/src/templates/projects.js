import React from "react"
import PropTypes from "prop-types"

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function Projects({ pageContext: { projects } }) {
  console.log(projects)
  return (
    <>
      <div>
        {projects.map((project, index) => (
          <div key={`project-${index}`}>
            <p>{index}</p>
            <p>{project.node.title}</p>
          </div>
        ))}
      </div>
    </>
  )
}

Projects.propTypes = {
  pageContext: PropTypes.any.isRequired,
}

Projects.defaultProps = {}

export default Projects
