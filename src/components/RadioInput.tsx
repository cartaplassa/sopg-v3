import { Radio, Input, Flex, FlexProps } from "@chakra-ui/react";
import * as CSS from "csstype";

interface RadioInputProps extends FlexProps {
  value: string;
  inputValue: string;
  inputOnChange: React.ChangeEventHandler<HTMLInputElement>;
  inputMargin?: CSS.Property.Margin | number;
}

export default function RadioInput({
  flex,
  value,
  inputValue,
  inputOnChange,
  inputMargin = "0 .5em",
}: RadioInputProps) {
  return (
    <Flex flex={flex}>
      <Radio value={value} />
      <Input
        m={inputMargin}
        flexGrow="1"
        value={inputValue}
        onChange={inputOnChange}
      />
    </Flex>
  );
}
