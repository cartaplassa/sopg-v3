import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

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
    _dark: {
      borderColor: "secondary",
      boxShadow: "none",
      _hover: {
        borderColor: "primary",
      },
    },
  },
});

const selectTheme = defineMultiStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default selectTheme;
