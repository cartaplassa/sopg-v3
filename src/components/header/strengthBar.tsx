import {
  Flex,
  FlexProps,
  Text,
  HStack,
  StackProps,
  Box,
  BoxProps,
} from "@chakra-ui/react";

interface StrengthRating {
  [barsToFill: number]: {
    readonly rating: string;
    readonly color: string;
  };
}

const strengthRating: StrengthRating = {
  0: {
    rating: "Very weak",
    color: "red.500",
  },
  1: {
    rating: "Weak",
    color: "orange.500",
  },
  2: {
    rating: "Kinda weak",
    color: "yellow.500",
  },
  3: {
    rating: "Moderate",
    color: "green.500",
  },
  4: {
    rating: "Strong",
    color: "teal.500",
  },
  5: {
    rating: "Very strong",
    color: "blue.500",
  },
};

function Bar({ color }: BoxProps) {
  return <Box w="0.75rem" h="2rem" bg={color} border="1px" />;
}

interface BarStackProps extends StackProps {
  readonly level: number;
}

function BarStack({ level, color }: BarStackProps) {
  const bars = [];
  for (let i = 0; i < 6; i++) {
    bars.push(<Bar key={i} color={i < level + 1 ? color : "transparent"} />);
  }
  return <HStack spacing="2px">{bars}</HStack>;
}

interface StrengthBarProps extends FlexProps {
  readonly entropy: number;
}

export function StrengthBar({ entropy }: StrengthBarProps) {
  const step = 40;
  const level = entropy > step * 6 ? 5 : Math.floor(entropy / step);
  return (
    <Flex
      justify="space-between"
      align="center"
      p="1rem"
      borderTop="1px"
      borderBottom="1px"
      borderColor="gray.100"
    >
      <Text as="b">Strength:</Text>
      <HStack>
        <Text>{strengthRating[level].rating}</Text>
        <BarStack level={level} color={strengthRating[level].color} />
      </HStack>
    </Flex>
  );
}
