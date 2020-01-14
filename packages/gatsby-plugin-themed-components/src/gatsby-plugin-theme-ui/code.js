import {colors as c} from "gatsby-design-tokens";

export default {
  default: {
    ...c.code,
    // refactor names
    background: "#fcebe2", // "#fbf2e9", // c.code.bg,
    backgroundInline: c.code.bgInline,
    // unchanged
    border: "#faede5",
    lineHighlightBackground: "#ffd8c3", // "#fbf0ea",
    // modify token color values to comply to WCAG 2.0 AA standard
    // contrast ratios changed
    selector: "#b94185",
    keyword: "#096fb3",
    comment: "#527713",
    tag: "#137886",
    regex: "#dc0437",
    remove: c.red[70],
    add: c.green[80],
    text: "#866c5b",
    punctuation: "#53450e",
    cssString: "#a2466c",
    invisibles: "#e0d7d1",
    // add a bunch of UI colors
    copyButton: c.grey[60],
    scrollbarTrack: "#e9ada4", // "#faede5",
  },
  dark: {
    // ui
    background: "#27252c", // "#1b191f", // another meh
    backgroundInline: c.grey[0],
    border: c.grey[90],
    // hex2rgba(c.purple[90], 0.25),
    lineHighlightBackground: "rgba(134,96,216,0.25)", // "rgba(54,32,102,0.25)",
    lineHighlightBorder: "#4215a3", // c.purple[90],
    scrollbarThumb: c.grey[70],
    scrollbarTrack: c.grey[90],
    copyButton: c.grey[40],
    // tokens
    add: c.green[50],
    comment: c.grey[30],
    cssString: c.orange[50],
    invisibles: "#e0d7d1",
    keyword: c.magenta[30],
    punctuation: c.whiteFade[70],
    regex: "#d88489",
    remove: c.red[40],
    selector: c.orange[30],
    tag: c.teal[60],
    text: c.grey[30],
  },
};
