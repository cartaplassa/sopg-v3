import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const custom = definePartsStyle({
  container: {
    bg: "secondary",
    borderWidth: "2px",
    borderColor: "primary",
  },
});

const tagTheme = defineMultiStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default tagTheme;
