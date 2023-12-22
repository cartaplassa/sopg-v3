import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

const custom = definePartsStyle({
  control: {
    border: ".15em solid",
    borderColor: "secondary",

    _hover: {
      borderColor: "primary",
    },

    _checked: {
      //   border: ".25em solid",
      background: "primary",
      borderColor: "primary",

      _hover: {
        background: "primary",
        borderColor: "primary",
        boxShadow: "styledoutline",
      },
    },
  },
  label: {
    mt: ".25em",
  },
});

const radioTheme = defineMultiStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default radioTheme;
