import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

import { cssVar } from "@chakra-ui/theme-tools";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const $width = cssVar("switch-track-width");
const $height = cssVar("switch-track-height");
const $thumbWidth = cssVar("switch-thumb-width");
const $translateX = cssVar("switch-thumb-x");

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
    borderColor: "transparent",
    bg: "transparent",
    boxShadow: "contour",
    _hover: {
      borderColor: "primary",
    },
    _checked: {
      boxShadow: "none",
      borderColor: "primary",
      bg: "primary",
      _hover: {
        boxShadow: "styledoutline",
      },
    },
    _dark: {
      boxShadow: "none",
      borderColor: "secondary",
      _checked: {
        borderColor: "primary",
        bg: "transparent",
      },
    },
  },
  thumb: {
    width: [$thumbWidth.reference],
    borderRadius: "sm",
    boxShadow: "contour",
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

export const switchTheme = defineMultiStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default switchTheme;
