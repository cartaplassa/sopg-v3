import { radioAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys);

/*
const custom = definePartsStyle({
  container: {
    [$width.variable]: "1.8em",
    [$height.variable]: "1.8em",
    [$thumbWidth.variable]: "1em",
    [$translateX.variable]: ".8em",
  },
  track: {
    p: 1,
    borderRadius: "md",
    borderWidth: "2px",
    borderColor: "secondary",
    bg: "transparent",
    boxShadow: "base",
    _hover: {
      borderColor: "primary",
    },
    _checked: {
      boxShadow: "none",
      borderColor: "primary",
      bg: "primary",
    },
    _dark: {
      boxShadow: "none",
      _checked: {
        bg: "transparent",
      },
    },
  },
  thumb: {
    width: [$thumbWidth.reference],
    borderRadius: "sm",
    boxShadow: "base",
    _checked: {
      boxShadow: "none",
    },
    _dark: {
      bg: "gray.700",
      _checked: {
        bg: "green.400",
      },
    },
  },
});
*/

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
        boxShadow: "0 0 0 .05em var(--chakra-colors-primary)",
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
