import React from "react"
import PropTypes from "prop-types"

/**
 *
 * @param {*} data
 * @return {JSX}
 */
function ProjectWidget({ projects }) {
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

ProjectWidget.propTypes = {
  projects: PropTypes.any.isRequired,
}

ProjectWidget.defaultProps = {}

export default ProjectWidget
