// Reference: https://dev.to/spences10/build-a-coding-blog-from-scratch-with-gatsby-and-mdx-2h31

/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Highlight, {defaultProps} from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import {copyToClipboard} from "./copy-to-clipboard";

const Code = ({codeString, language}) => {
  const handleClick = () => {
    copyToClipboard(codeString);
  };

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre
          className={className}
          style={style}
          sx={{
            "textAlign": "left",
            "margin": "1rem 0",
            "padding": "0.5rem",
            "overflowX": "auto",
            "borderRadius": "3px",
            "&.token-line": {
              lineHeight: "1.3rem",
              height: "1.3rem",
            },
            "fontFamily": "'Courier New', Courier, monospace",
            "position": "relative",
          }}
        >
          <button
            sx={{
              "position": "absolute",
              "right": "0.25rem",
              "border": 0,
              "borderRadius": "3px",
              "margin": "0.25em",
              "opacity": 0.3,
              "&:hover": {
                opacity: 1,
              },
            }}
            onClick={handleClick}
          >
            Copy
          </button>
          {tokens.map((line, i) => (
            <div key={"div" + i} {...getLineProps({line, key: i})}>
              <span
                sx={{
                  display: "inline-block",
                  width: "2rem",
                  userSelect: "none",
                  opacity: "0.3",
                }}
              >
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={"span" + i} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

Code.propTypes = {
  codeString: PropTypes.any.isRequired,
  language: PropTypes.string.isRequired,
};

Code.defaultProps = {};

export default Code;
