import { Text, HStack, Box, BoxProps, Flex, Grid } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

const controlFlexProps = {
  justify: "space-between",
  align: "center",
  p: "1rem",
  borderTop: "1px",
  borderBottom: "1px",
  borderColor: "gray.100",
};

const controlGridProps = {
  gridTemplateColumns: "repeat(2, 1fr)",
};

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

function strengthLevel(entropy: number) {
  const step = 40;
  const level = entropy > step * 6 ? 5 : Math.floor(entropy / step);
  return level;
}

function Bar({ color }: BoxProps) {
  return <Box w="0.75rem" h="2rem" bg={color} border="1px" />;
}

export function BarStack({
  entropy,
  center = false,
}: {
  entropy: number;
  center?: boolean;
}) {
  const level = strengthLevel(entropy);
  const color = strengthRating[level].color;
  const bars = [];
  for (let i = 0; i < 6; i++) {
    bars.push(<Bar key={i} color={i < level + 1 ? color : "transparent"} />);
  }
  return center ? (
    <HStack margin="0 auto" spacing="2px">
      {bars}
    </HStack>
  ) : (
    <HStack spacing="2px">{bars}</HStack>
  );
}

export function StrengthText({ entropy }: { entropy: number }) {
  const level = strengthLevel(entropy);
  return <Text>{strengthRating[level].rating}</Text>;
}

export function StrengthMeter({ entropy }: { entropy: number }) {
  const [isDesktop] = useMediaQuery("(min-width: 40em)");
  return isDesktop ? (
    <Flex {...controlFlexProps}>
      <Text>Entropy:</Text>
      <HStack>
        <Text as="b" fontSize="xl">
          ~{entropy} bits
        </Text>
        <BarStack entropy={entropy} />
        <StrengthText entropy={entropy} />
      </HStack>
    </Flex>
  ) : (
    <Grid {...controlGridProps}>
      <Text>Entropy:</Text>
      <Text as="b" fontSize="xl">
        ~{entropy} bits
      </Text>
      <StrengthText entropy={entropy} />
      <BarStack center entropy={entropy} />
    </Grid>
  );
}
