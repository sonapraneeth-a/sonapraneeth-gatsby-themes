import React from "react";
import {RootBulb} from "@sonapraneeth/base";
import {Header, Container, Main, Footer, Styled} from "@sonapraneeth/base";

export default () => {
  return (
    <RootBulb>
      <Header>
        <Container>
          <Styled.h1>Hello, world</Styled.h1>
        </Container>
      </Header>
      <Main>
        <Container>
          <p>Main content</p>
          <Styled.a href="https://theme-ui.com/getting-started">Link</Styled.a>
        </Container>
      </Main>
      <Footer>
        <Container>
          <p>Copyright. Footer</p>
        </Container>
      </Footer>
    </RootBulb>
  );
};
