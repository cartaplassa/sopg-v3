import { Text, TextProps } from "@chakra-ui/react";
interface OutputItemProps extends TextProps {
  value: string;
}

const style = {
  border: "2px solid transparent",
  borderRadius: "md",

  fontFamily: "serif",
  fontWeight: "normal",

  _hover: {
    borderColor: "primary",
  },
};

export default function OutputItem({ value, ...props }: OutputItemProps) {
  return (
    <Text as="samp" hidden={!value} sx={style} {...props}>
      {value}
    </Text>
  );
}
