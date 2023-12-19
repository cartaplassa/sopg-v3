import { defineStyleConfig } from "@chakra-ui/react";

const custom = {
  boxShadow: "dark-lg",
  rounded: "md",
  _dark: {
    color: "primary",
  },
};

const appComponentTheme = defineStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default appComponentTheme;
