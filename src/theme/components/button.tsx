import { defineStyleConfig } from "@chakra-ui/react";

const custom = {
  boxShadow: "contour",
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
      boxShadow: "styledoutline",
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
