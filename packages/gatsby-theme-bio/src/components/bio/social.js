// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import {jsx} from "theme-ui";
import {
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from "@sonapraneeth/gatsby-plugin-themed-components";

SocialBio.propTypes = {
  linkedin: PropTypes.string,
  github: PropTypes.string,
  twitter: PropTypes.string,
};

SocialBio.defaultProps = {
  linkedin: "",
  github: "",
  twitter: "",
};

/**
 * @return {JSX}
 */
function SocialBio({linkedin, github, twitter}) {
  /* Reference: https://stackoverflow.com/questions/51683761/how-to-fix-lighthouse-links-do-not-have-a-discernible-name */
  return (
    <p
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        fontSize: [0, 0, 2],
      }}
    >
      {linkedin !== null && linkedin !== "" && (
        <a
          href={"https://www.linkedin.com/" + linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{borderBottom: "none"}}
          aria-label={"LinkedIn"}
        >
          <FaLinkedinIn
            sx={{
              color: "icons.linkedin",
              fontSize: 5,
            }}
          />
        </a>
      )}
      {github !== null && github !== "" && (
        <a
          href={"https://www.github.com/" + github}
          target="_blank"
          rel="noopener noreferrer"
          style={{borderBottom: "none"}}
          aria-label={"Github"}
        >
          <FaGithub
            sx={{
              color: "icons.github",
              fontSize: 5,
            }}
          />
        </a>
      )}
      {twitter !== null && twitter !== "" && (
        <a
          href={"https://www.twitter.com/" + twitter}
          target="_blank"
          rel="noopener noreferrer"
          style={{borderBottom: "none"}}
          aria-label={"Twitter"}
        >
          <FaTwitter
            sx={{
              color: "icons.twitter",
              fontSize: 5,
            }}
          />
        </a>
      )}
    </p>
  );
}

export default SocialBio;
