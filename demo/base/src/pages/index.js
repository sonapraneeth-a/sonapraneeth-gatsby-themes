import React from "react";
import {RootBulb} from "@sonapraneeth/base";
import {SHeader, SContainer, SMain, SFooter, Styled} from "@sonapraneeth/base";

export default () => {
  return (
    <RootBulb>
      <SHeader>
        <SContainer>
          <Styled.h1>This is a Header</Styled.h1>
        </SContainer>
      </SHeader>
      <SMain>
        <SContainer>
          <p>This is Main content</p>
          <Styled.a href="https://theme-ui.com/getting-started">Link</Styled.a>
        </SContainer>
      </SMain>
      <SFooter>
        <SContainer>
          <p>This is a Footer. Copyright &copy; 2019. Footer</p>
        </SContainer>
      </SFooter>
    </RootBulb>
  );
};
