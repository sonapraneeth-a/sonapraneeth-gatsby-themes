import {
  RootSwitch,
  RootBulb,
  BaseLayout,
  PageLayout,
} from "./src/layouts/index";
import {
  SBox,
  SFlex,
  SLayout,
  SHeader,
  SMain,
  SContainer,
  SFooter,
} from "./src/components/theme-ui/index.js";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Chip,
  StatusChip,
  Grid,
  GridItem,
  GatsbyImage,
  HeadMeta,
  SEO,
  TableOfContents,
  MDXComponents,
  TagList,
  CategoryList,
} from "./src/components/index";
import {from, screens} from "./src/components/breakpoints";
import {Styled, jsx, useThemeUI} from "theme-ui";
import {
  FaInfoCircle,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaRss,
  FaCalendarAlt,
  FaTag,
  FaCode,
  FaFileAlt,
  FaFilePowerpoint,
  FaArrowRight,
  FaReadme,
  FaFolderOpen,
  FaStar,
  FaClock,
} from "react-icons/fa";
import {useSiteMetadata, useSiteMetadataSocial} from "./src/hooks/index";
import {colors} from "gatsby-design-tokens";
import {getFormattedDate} from "./utils/index";

export {
  // Layouts
  RootSwitch,
  RootBulb,
  BaseLayout,
  PageLayout,
  // Components
  Button,
  Card,
  CardContent,
  CardFooter,
  Chip,
  StatusChip,
  Grid,
  GridItem,
  GatsbyImage,
  HeadMeta,
  SEO,
  TableOfContents,
  MDXComponents,
  TagList,
  CategoryList,
  // Breakpoints
  from,
  screens,
  // Modified ThemeUI Components
  SBox,
  SFlex,
  SLayout,
  SHeader,
  SMain,
  SContainer,
  SFooter,
  // ThemeUI styling
  Styled,
  jsx,
  useThemeUI,
  // Icons
  FaInfoCircle,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaRss,
  FaCalendarAlt,
  FaTag,
  FaCode,
  FaFileAlt,
  FaFilePowerpoint,
  FaArrowRight,
  FaReadme,
  FaFolderOpen,
  FaStar,
  FaClock,
  // Hooks
  useSiteMetadata,
  useSiteMetadataSocial,
  // Gatsby Design Tokens
  colors,
  // Utility functions
  getFormattedDate,
};
