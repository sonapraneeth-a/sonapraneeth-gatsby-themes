const prismToken = (t) => {
  return {
    // PrismJS syntax highlighting token styles
    // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/
    ".token": {
      display: "inline",
    },
    ".token-line": {
      borderLeft: `${t.space[1]} solid ${t.colors.code.background}`,
      lineHeight: `${t.lineHeights.body}`,
      height: `${t.lineHeights.body}rem`,
    },
    ".token.comment, .token.block-comment, .token.prolog": {
      color: t.colors.code.comment,
    },
    ".token.doctype, .token.cdata": {
      color: t.colors.code.comment,
    },
    ".token.property, .token.tag, .token.boolean, .token.number": {
      color: t.colors.code.tag,
    },
    ".token.function-name, .token.constant, .token.symbol": {
      color: t.colors.code.tag,
    },
    ".token.punctuation": {
      color: t.colors.code.punctuation,
    },
    ".token.selector, .token.attr-name, .token.string, .token.char": {
      color: t.colors.code.selector,
    },
    ".token.function, .token.builtin": {
      color: t.colors.code.selector,
    },
    ".token.operator, .token.entity, .token.url, .token.variable": {},
    ".token.atrule, .token.attr-value, .token.keyword, .token.class-name": {
      color: t.colors.code.keyword,
    },
    ".token.inserted": {
      color: t.colors.code.add,
    },
    ".token.deleted": {
      color: t.colors.code.remove,
    },
    ".token.regex, .token.important": {
      color: t.colors.code.regex,
    },
    ".language-css .token.string, .style .token.string": {
      color: t.colors.code.cssString,
    },
    ".token.important": {
      fontWeight: t.fontWeights.body,
    },
    ".token.bold": {
      fontWeight: t.fontWeights.bold,
    },
    ".token.italic": {
      fontStyle: "italic",
    },
    ".token.entity": {
      cursor: "help",
    },
    ".namespace": {
      opacity: 0.7,
    },
    // PrismJS plugin styles
    ".token.tab:not(:empty):before, .token.cr:before, .token.lf:before": {
      color: t.colors.code.invisibles,
    },
  };
};

const gatsbyHighlight = (t) => {
  return {
    // gatsby-remark-prismjs styles
    ".gatsby-highlight": {
      backgroundColor: t.colors.code.background,
      color: t.colors.text,
      position: "relative",
      WebkitOverflowScrolling: "touch",
    },
    ".gatsby-highlight pre code": {
      display: "block",
      fontSize: "100%",
      lineHeight: 1.5,
      float: "left",
      minWidth: "100%",
      // reset code vertical padding declared earlier
      padding: `0 ${t.space[6]}`,
    },
    ".gatsby-highlight-code-line": {
      backgroundColor: t.colors.code.lineHighlightBackground,
      /* marginLeft: `-${t.space[6]}`,
      marginRight: `-${t.space[6]}`,
      paddingLeft: t.space[5],
      paddingRight: t.space[6],*/
      borderLeft: `${t.space[1]} solid ${t.colors.code.lineHighlightBorder}`,
      display: "block",
    },
    ".gatsby-highlight pre::-webkit-scrollbar": {
      width: t.space[2],
      height: t.space[2],
    },
    ".gatsby-highlight pre::-webkit-scrollbar-thumb": {
      backgroundColor: t.colors.code.scrollbarThumb,
    },
    ".gatsby-highlight pre::-webkit-scrollbar-track": {
      backgroundColor: t.colors.code.scrollbarTrack,
    },
  };
};

const printMedia = (t) => {
  return {
    "@media print": {
      ".gatsby-highlight-code-line, .token-line": {
        borderLeftWidth: "0!important",
      },
      ".token-line": {
        paddingLeft: `${t.space[1]}`,
      },
    },
  };
};

export const globalStyles = (t) => {
  return {
    ...prismToken(t),
    ...gatsbyHighlight(t),
    ...printMedia(t),
    "*": {
      boxSizing: "border-box",
      lineHeight: `${t.lineHeights.body}`,
    },
    "body": {
      margin: 0,
      fontFamily: `${t.fonts.body}`,
      boxSizing: "border-box",
      lineHeight: `${t.lineHeights.body}`,
      transition: "all 0.3s ease-in-out",
    },
    "html": {
      fontSize: "18px",
    },
    "pre": {
      fontFamily: `${t.fonts.monospace}`,
    },
    "code": {
      fontFamily: `${t.fonts.monospace}`,
      backgroundColor: `${t.colors.code.background}`,
      marginLeft: `${t.space[1]}`,
      marginRight: `${t.space[1]}`,
      paddingLeft: `${t.space[1]}`,
      paddingRight: `${t.space[1]}`,
    },
    "::-webkit-scrollbar-track": {
      WebkitBoxShadow: `inset 0 0 6px ${t.colors.background}`,
      backgroundColor: `${t.colors.background}`,
    },
    "::-webkit-scrollbar": {
      width: "6px",
      backgroundColor: "#F5F5F5",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: `${t.colors.text}`,
    },
    ".id-link": {
      "color": `${t.colors.text} !important`,
      "backgroundColor": `${t.colors.background} !important`,
      "textDecoration": "none !important",
      "borderBottom": "none !important",
      "marginRight": "0.5rem",
      ":hover": {
        color: `${t.colors.text} !important`,
        backgroundColor: `${t.colors.background} !important`,
        textDecoration: "none !important",
        borderBottom: "none !important",
      },
    },
  };
};
