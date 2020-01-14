// Reference: https://dev.to/spences10/build-a-coding-blog-from-scratch-with-gatsby-and-mdx-2h31

/** @jsx jsx */
import {jsx} from "theme-ui";
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Highlight, {defaultProps} from "prism-react-renderer";
import theme from "prism-react-renderer/themes/oceanicNext";
import CopyButton from "./copy-button";
import LineNo from "./line-no";

const languageMap = {
  cpp: "C++",
};

const getHighlightLines = (input) => {
  const lines = [];
  if (input === null || input === undefined) return lines;
  const groups = input.split(",");
  for (let idx = 0; idx < groups.length; idx++) {
    const line = groups[idx].split("-");
    if (line.length === 1) {
      lines.push([parseInt(line[0], 10), parseInt(line[0], 10)]);
    } else {
      lines.push([parseInt(line[0], 10), parseInt(line[1], 10)]);
    }
  }
  return lines;
};

const checkIfLineIsToBeHighlighted = (lineNos, currentLineNo) => {
  if (lineNos.length === 0) return false;
  for (let idx = 0; idx < lineNos.length; idx++) {
    if (currentLineNo >= lineNos[idx][0] && currentLineNo <= lineNos[idx][1]) {
      return true;
    }
  }
  return false;
};

const Code = ({codeString, language, ...props}) => {
  const lines = getHighlightLines(props.highlight);
  const printLineNos =
    props.lineNos === undefined || props.lineNos === null ?
      true :
      props.lineNos === "true" ?
        true :
        false;
  const copy =
    props.copy === undefined || props.copy === null ?
      true :
      props.copy === "true" ?
        true :
        false;
  return (
    <>
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          bg: "black",
          color: "white",
          borderTopLeftRadius: "3px",
          borderTopRightRadius: "3px",
        }}
      >
        <div
          sx={{
            right: "0.25rem",
            border: 0,
            borderRadius: "3px",
            margin: 1,
            opacity: 1,
            fontSize: 3,
            px: 1,
          }}
        >
          {props.title}
        </div>
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            sx={{
              right: "0.25rem",
              border: 0,
              borderRadius: "3px",
              margin: 1,
              opacity: 1,
              fontSize: 3,
              px: 1,
            }}
          >
            {languageMap[language]}
          </div>
          {copy && <CopyButton content={codeString} />}
        </div>
      </div>
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
              "margin": "0 0 1rem 0",
              "py": "0.5rem",
              "overflowX": "auto",
              "borderBottomLeftRadius": "3px",
              "borderBottomRightRadius": "3px",
              "&.token-line": {
                lineHeight: "1.3rem",
                height: "1.3rem",
              },
              "fontFamily": "monospace",
              "position": "relative",
            }}
          >
            {tokens.map((line, i) => {
              if (checkIfLineIsToBeHighlighted(lines, i + 1)) {
                return (
                  <div
                    key={"div" + i}
                    {...getLineProps({line, key: i})}
                    sx={{
                      bg: "#663399",
                      borderLeft: "0.4rem solid #362066",
                    }}
                  >
                    {printLineNos && <LineNo number={i + 1} />}
                    {line.map((token, key) => (
                      <span
                        key={"span" + i}
                        {...getTokenProps({token, key})}
                        sx={{
                          marginLeft: 1,
                          fontSize: 4,
                        }}
                      />
                    ))}
                  </div>
                );
              } else {
                return (
                  <div
                    key={"div" + i}
                    {...getLineProps({line, key: i})}
                    sx={{
                      borderLeft: "0.4rem solid #362066",
                    }}
                  >
                    {printLineNos && <LineNo number={i + 1} />}
                    {line.map((token, key) => (
                      <span
                        key={"span" + i}
                        {...getTokenProps({token, key})}
                        sx={{
                          marginLeft: 1,
                          fontSize: 4,
                        }}
                      />
                    ))}
                  </div>
                );
              }
            })}
          </pre>
        )}
      </Highlight>
    </>
  );
};

Code.propTypes = {
  codeString: PropTypes.any.isRequired,
  language: PropTypes.string.isRequired,
  title: PropTypes.string,
  copy: PropTypes.string,
  highlight: PropTypes.string,
  lineNos: PropTypes.string,
};

Code.defaultProps = {};

export default Code;
