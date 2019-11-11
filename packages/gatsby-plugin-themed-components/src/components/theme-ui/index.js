/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import {useContext} from "react";
import {SidebarContext} from "../../context/sidebar";
// ThemeUI Components
import {Box, Flex, Layout, Header, Main, Container, Footer} from "theme-ui";

const SBox = (props) => {
  return <Box {...props} />;
};

const SFlex = (props) => {
  return <Flex {...props} />;
};

const SLayout = (props) => {
  return <Layout {...props} />;
};

const SHeader = (props) => {
  return <Header {...props} />;
};

const SMain = (props) => {
  return <Main {...props} />;
};

const SContainer = (props) => {
  const {display} = useContext(SidebarContext);
  const css = {
    width:
      display === true ? ["95%"] : ["95%", "95%", "85%", "85%", "85%", "80%"],
  };
  return (
    <Container
      {...props}
      sx={{
        margin: "0 auto",
        maxWidth: "none",
        px: [1, 1, 1, 4],
        py: 4,
        ...css,
      }}
    />
  );
};

const SFooter = (props) => {
  return <Footer {...props} />;
};

export {SBox, SFlex, SLayout, SHeader, SMain, SContainer, SFooter};
