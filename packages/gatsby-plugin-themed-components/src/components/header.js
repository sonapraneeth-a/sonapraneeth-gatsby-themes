/** @jsx jsx */
import {jsx, Styled} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import {Link} from "gatsby";

import {SContainer, SHeader} from "../components/theme-ui/index";
import {useSiteMetadata} from "../hooks/useSiteMetadata";

/**
 * Base layout for all other layouts
 * @return {JSX} Rendered children for the page
 */
function Header() {
  const siteMeta = useSiteMetadata();
  return (
    <SHeader>
      <SContainer
        sx={{
          textAlign: "center",
        }}
      >
        <Styled.h1>
          <Styled.a
            as={Link}
            to={siteMeta.baseUrl}
            sx={{
              textDecoration: "none",
              borderBottom: "none",
            }}
          >
            {siteMeta.title}
          </Styled.a>
        </Styled.h1>
      </SContainer>
    </SHeader>
  );
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
