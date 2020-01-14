import React from "react";

import H1 from "./h1";
import {Code} from "./code/";

export const MDXComponents = {
  h1: H1,
  pre: ({children: {props}}) => {
    if (props.mdxType === "code") {
      return (
        <Code
          codeString={props.children.trim()}
          language={props.className && props.className.replace("language-", "")}
          {...props}
        />
      );
    }
  },
};
