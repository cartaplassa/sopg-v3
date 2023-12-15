import { RadioGroup, RadioGroupProps, Flex, FlexProps } from "@chakra-ui/react";

export default function FlexRadioGroup({
  children,
  value,
  onChange,
  gridColumn, // Grid breaks when removed
  gridRow, // Grid breaks when removed
  direction,
}: RadioGroupProps & FlexProps) {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      gridColumn={gridColumn} // Grid breaks when removed
      gridRow={gridRow} // Grid breaks when removed
    >
      <Flex w="100%" h="100%" direction={direction}>
        {children}
      </Flex>
    </RadioGroup>
  );
}
