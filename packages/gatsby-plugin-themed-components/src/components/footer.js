/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import {Styled} from "theme-ui";

import {SFlex, SFooter} from "../components/theme-ui/index";
import {useSiteMetadata} from "../hooks/useSiteMetadata";
import {useSiteMetadataSocial} from "../hooks/useSiteMetadataSocial";
import {
  FaHeart,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";

/**
 * Base layout for all other layouts
 * @return {JSX} Rendered children for the page
 */
function Footer() {
  const siteMeta = useSiteMetadata();
  const author =
    siteMeta.author !== null && siteMeta.author !== "" ?
      siteMeta.author :
      "author";
  const siteMetaSocial = useSiteMetadataSocial();
  const twitter =
    siteMetaSocial.twitter !== null && siteMetaSocial.twitter !== "";
  const facebook =
    siteMetaSocial.facebook !== null && siteMetaSocial.facebook !== "";
  const linkedin =
    siteMetaSocial.linkedin !== null && siteMetaSocial.linkedin !== "";
  const github = siteMetaSocial.github !== null && siteMetaSocial.github !== "";
  return (
    <SFooter
      sx={{
        borderTop: "0.1rem solid",
        borderColor: "muted",
      }}
    >
      <SFlex
        sx={{
          width: "90%",
          justifyContent: "space-between",
          margin: "0 auto",
        }}
      >
        <p
          sx={{
            width: "50%",
          }}
        >
          Copyright &copy;{" "}
          <Styled.a
            as={Link}
            to={siteMeta.siteUrl}
            rel="noopener noreferrer"
            style={{borderBottom: "none"}}
            aria-label={"Link of " + author + " for this webpage"}
          >
            {siteMeta.author}
          </Styled.a>{" "}
          {new Date().getFullYear()}. <br />
          Made in
          <FaHeart
            sx={{
              color: "red",
              mx: "0.2rem",
            }}
          />
          with GatsbyJS.
        </p>
        <p
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "50%",
            height: "fit-content",
            flexWrap: "wrap",
          }}
        >
          {twitter && (
            <Styled.a
              href={"https://www.twitter.com/" + siteMetaSocial.twitter + "/"}
              sx={{
                "variant": "link.none",
                "color": "icons.twitter",
                "bg": "background",
                "px": 4,
                "py": 4,
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
              target="_blank"
              rel="noopener noreferrer"
              style={{borderBottom: "none"}}
              aria-label={"Twitter link of " + author}
            >
              <FaTwitter />
            </Styled.a>
          )}
          {facebook && (
            <Styled.a
              href={"https://www.facebook.com/" + siteMetaSocial.facebook + "/"}
              sx={{
                "variant": "link.none",
                "color": "icons.facebook",
                "bg": "background",
                "px": 4,
                "py": 4,
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
              target="_blank"
              rel="noopener noreferrer"
              style={{borderBottom: "none"}}
              aria-label={"Facebook link of " + author}
            >
              <FaFacebookF />
            </Styled.a>
          )}
          {linkedin && (
            <Styled.a
              href={
                "https://www.linkedin.com/in/" + siteMetaSocial.linkedin + "/"
              }
              sx={{
                "variant": "link.none",
                "color": "icons.linkedin",
                "bg": "background",
                "px": 4,
                "py": 4,
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
              target="_blank"
              rel="noopener noreferrer"
              style={{borderBottom: "none"}}
              aria-label={"LinkedIn link of " + author}
            >
              <FaLinkedinIn />
            </Styled.a>
          )}
          {github && (
            <Styled.a
              href={"https://www.github.com/" + siteMetaSocial.github + "/"}
              sx={{
                "variant": "link.none",
                "color": "icons.github",
                "bg": "background",
                "px": 4,
                "py": 4,
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
              target="_blank"
              rel="noopener noreferrer"
              style={{borderBottom: "none"}}
              aria-label={"Github link of " + author}
            >
              <FaGithub />
            </Styled.a>
          )}
        </p>
      </SFlex>
    </SFooter>
  );
}

Footer.propTypes = {
  social: PropTypes.any,
};

Footer.defaultProps = {};

export default Footer;
