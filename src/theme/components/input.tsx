import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const custom = definePartsStyle({
  field: {
    boxShadow: "contour",
    pt: ".25em",
    bg: "transparent",
    borderWidth: "2px",
    borderColor: "transparent",
    _hover: {
      borderColor: "primary",
    },
    _focusVisible: {
      borderColor: "primary",
      _hover: {
        boxShadow: "styledoutline",
      },
    },
    _dark: {
      borderColor: "secondary",
      boxShadow: "none",
      _hover: {
        borderColor: "primary",
      },
      _focusVisible: {
        borderColor: "primary",
        _hover: {
          boxShadow: "styledoutline",
        },
      },
    },
  },
});

const inputTheme = defineMultiStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default inputTheme;
