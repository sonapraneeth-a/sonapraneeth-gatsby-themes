// Reference: https://github.com/gatsbyjs/gatsby/blob/master/www/src/components/copy.js

/** @jsx jsx */
import {jsx} from "theme-ui";
import {useState} from "react";
import PropTypes from "prop-types";

import {copyToClipboard} from "./copy-to-clipboard";

const delay = (duration) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

/**
 *
 * @param {*} param0
 * @return {JSX}
 */
function CopyButton({content, fileName, duration, trim}) {
  const [copied, setCopied] = useState(false);

  const label = copied ?
    `${fileName ? fileName + " " : ""}copied to clipboard` :
    `${fileName ? fileName + ": " : ""}copy code to clipboard`;

  return (
    <button
      name={label}
      disabled={copied}
      sx={{
        "right": "0.25rem",
        "border": 0,
        "borderRadius": "3px",
        "margin": 1,
        "opacity": 0.5,
        "fontSize": 3,
        "px": 1,
        "fontFamily": "body",
        "&:hover": {
          opacity: 1,
          cursor: "pointer",
        },
      }}
      onClick={async () => {
        await copyToClipboard(trim ? content.trim() : content);
        setCopied(true);
        await delay(duration);
        setCopied(false);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

CopyButton.propTypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trim: PropTypes.bool,
  className: PropTypes.any,
  fileName: PropTypes.string,
};

CopyButton.defaultProps = {
  duration: 3000,
  fileName: "",
  trim: false,
};

export default CopyButton;
