import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const custom = defineStyle({
  _hover: {
    color: "primary",
  },
});

const linkTheme = defineStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default linkTheme;
