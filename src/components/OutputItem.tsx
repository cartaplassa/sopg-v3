import { Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

const outputItemProps: TextProps = {
  as: "kbd",
  m: "1px",
  _hover: {
    m: 0,
    bg: "gray.200",
    border: "1px",
    borderColor: "purple.400",
    borderRadius: ".5rem",
  },
};

interface OutputItemProps extends TextProps {
  children: ReactNode;
}

export default function OutputItem({
  border = "2px",
  borderRadius = ".5em",
  children,
}: OutputItemProps) {
  return (
    <Text as="kbd" m={border} _hover={{ m: 0, border, borderRadius }}>
      {children}
    </Text>
  );
}
