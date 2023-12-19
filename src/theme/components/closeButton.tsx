import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

const custom = defineStyle({
  borderWidth: "2px",
  fontWeight: "normal",
  fontFamily: "mono",
  _hover: {
    borderColor: "primary",
  },
});

const closeButtonTheme = defineStyleConfig({
  variants: { custom },
  defaultProps: {
    size: "lg",
    variant: "custom",
  },
});

export default closeButtonTheme;
