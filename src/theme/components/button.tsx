import { defineStyleConfig } from "@chakra-ui/react";

const custom = {
  boxShadow: "base",
  borderWidth: "2px",
  borderColor: "white",
  _hover: {
    borderColor: "primary",
  },
  _active: {
    bg: "primary",
    color: "white",
  },
  _dark: {
    boxShadow: "none",
    borderColor: "primary",
    _hover: {
      boxShadow: "0 0 0 .05em var(--chakra-colors-primary)",
    },
    _active: {
      color: "black",
    },
  },
};

const buttonTheme = defineStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default buttonTheme;
