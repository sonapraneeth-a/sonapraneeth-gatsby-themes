import React from "react";
import {RootBulb} from "@sonapraneeth/base";
import {Header, Container, Main, Footer} from "@sonapraneeth/base";

export default props => (
  <RootBulb>
    <Header>
      <Container>
        <h1>Hello, world</h1>
      </Container>
    </Header>
    <Main>
      <Container>
        <p>Main content</p>
      </Container>
    </Main>
    <Footer>
      <Container>
        <p>Copyright. Footer</p>
      </Container>
    </Footer>
  </RootBulb>
);
