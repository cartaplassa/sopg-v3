import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const custom = definePartsStyle({
  field: {
    pt: ".25em",
    bg: "transparent",
    borderWidth: "2px",
    borderColor: "secondary",
    _hover: {
      borderColor: "primary",
    },
    _focusVisible: {
      borderColor: "primary",
      _hover: {
        boxShadow: "0 0 0 .05em var(--chakra-colors-primary)",
      },
    },
  },
});

const selectTheme = defineMultiStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default selectTheme;
