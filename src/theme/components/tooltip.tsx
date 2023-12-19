import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const custom = defineStyle({
  bg: "secondary",
  borderWidth: "1px",
  borderColor: "secondary",
  color: "black",
  _dark: {
    borderColor: "primary",
    color: "primary",
  },
});

const tooltipTheme = defineStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default tooltipTheme;
