import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const custom = definePartsStyle({
  button: {
    borderWidth: "2px",
    borderRadius: 0,
    _hover: {
      borderColor: "primary",
    },
  },
});

const accordionTheme = defineMultiStyleConfig({
  variants: { custom },
  defaultProps: { variant: "custom" },
});

export default accordionTheme;
