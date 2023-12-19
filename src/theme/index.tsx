import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import components from "./components";

const breakpoints = {
  sm: "40em", // 480px
  md: "58em", // 768px
  lg: null, // 992px
  xl: null, // 1280px
  "2xl": "96em", // 1536px
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
