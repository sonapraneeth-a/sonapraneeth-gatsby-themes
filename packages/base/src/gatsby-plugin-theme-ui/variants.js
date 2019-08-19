export default {
  // variants can use custom, user-defined names
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
    caps: {
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
  },
  icon: {
    display: "inline-block",
    verticalAlign: "middle",
    marginLeft: "0.15rem",
  },
  chip: {
    completed: {
      bg: "#00ff95",
      color: "black",
      borderColor: "#00ff95",
    },
    ongoing: {
      bg: "#fdd835",
      color: "black",
      borderColor: "#fdd835",
    },
  },
  link: {
    none: {
      border: "none",
      textDecoration: "none",
    },
  },
  button: {
    primary: {
      color: "background",
      bg: "primary",
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
};
