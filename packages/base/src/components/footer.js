// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import {Link} from "gatsby";
import {Styled} from "theme-ui";
/** @jsx jsx */
import {jsx} from "theme-ui";

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
          margin: "1rem auto",
        }}
      >
        <p
          sx={{
            width: "70%",
          }}
        >
          Copyright &copy;{" "}
          <Styled.a as={Link} to={siteMeta.siteUrl}>
            {siteMeta.author}
          </Styled.a>{" "}
          {new Date().getFullYear()}. Made in
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
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          {twitter && (
            <Styled.a
              href={"https://www.twitter.com/" + siteMetaSocial.twitter + "/"}
              sx={{
                "variant": "link.none",
                "color": "icons.twitter",
                "bg": "background",
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
            >
              <FaTwitter />
            </Styled.a>
          )}
          {facebook && (
            <Styled.a
              href={"https://www.facebook.com/" + siteMetaSocial.linkedin + "/"}
              sx={{
                "variant": "link.none",
                "color": "icons.facebook",
                "bg": "background",
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
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
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
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
                ":hover": {
                  color: "text",
                  bg: "background",
                },
              }}
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
