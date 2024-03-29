import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import components from "./components";

/*
const oldBreakpoints = {
  sm: "40em", // 480px
  md: "58em", // 768px
  lg: null, // 992px
  xl: null, // 1280px
  "2xl": "96em", // 1536px
};
*/

export const breakpoints = {
  sm: "24em", // 384px
  md: "42em", // 672px
  lg: "80em", // 1280px
  xl: null,
  "2xl": null,
};

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const semanticTokens = {
  colors: {
    primary: {
      default: "blue.500",
      _dark: "green.400",
    },
    secondary: {
      default: "gray.300",
      _dark: "gray.700",
    },
  },
  shadows: {
    styledoutline: "0 0 0 .1em var(--chakra-colors-primary)",
    contour:
      "0 .1em .3em 0 rgba(0, 0, 0, 0.2), 0 .1em .2em 0 rgba(0, 0, 0, 0.12)",
  },
};

const theme = extendTheme({
  breakpoints,
  components,
  config,
  semanticTokens,
});

export default theme;

/*
const theme = extendTheme(
  {
    breakpoints,
    components,
    config,
    semanticTokens,
  },
  withDefaultProps({
    defaultProps: {
      variant: "custom",
    },
    components: ["Button", "Switch"],
  })
);
*/
