import React from "react";
import {RootBulb} from "@sonapraneeth/base";
import {Header, Container, Main, Footer} from "@sonapraneeth/base";

export default () => {
  return (
    <RootBulb>
      <Header>
        <Container>
          <h1>Hello, world</h1>
        </Container>
      </Header>
      <Main>
        <Container>
          <p>Main content</p>
          <a href="https://theme-ui.com/getting-started">Link</a>
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
