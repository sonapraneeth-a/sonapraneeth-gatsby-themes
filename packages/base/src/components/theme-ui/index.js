/** @jsx jsx */
import {jsx} from "theme-ui";
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
  return (
    <Container
      {...props}
      sx={{
        margin: "0 auto",
        width: ["95%", "95%", "85%", "80%"],
        maxWidth: "none",
        p: "1rem",
      }}
    />
  );
};

const SFooter = (props) => {
  return <Footer {...props} />;
};

export {SBox, SFlex, SLayout, SHeader, SMain, SContainer, SFooter};
