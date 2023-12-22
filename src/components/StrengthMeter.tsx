import {
  Text,
  HStack,
  Box,
  BoxProps,
  Flex,
  FlexProps,
  TextProps,
  Tag,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

const fullScaleValue = 240;

const stretchedBoxProps: BoxProps = {
  position: "absolute",
  top: 0,
  left: 0,
  h: "105%",
};

const scaleFlexProps: FlexProps = {
  justify: "center",
  align: "center",
  p: "1em",
};

interface StrengthRating {
  [barsToFill: number]: {
    readonly rating: string;
    readonly color: string;
  };
}

const colorTone = 500;
const strengthRating: StrengthRating = {
  0: {
    rating: "Very weak",
    color: "red." + colorTone,
  },
  1: {
    rating: "Weak",
    color: "orange." + colorTone,
  },
  2: {
    rating: "Kinda weak",
    color: "yellow." + colorTone,
  },
  3: {
    rating: "Moderate",
    color: "green." + colorTone,
  },
  4: {
    rating: "Strong",
    color: "teal." + colorTone,
  },
  5: {
    rating: "Very strong",
    color: "blue." + colorTone,
  },
};

function scaleValue(entropy: number) {
  const percent = Math.floor((entropy / fullScaleValue) * 100);
  return percent > 100 ? "100%" : percent + "%";
}

function strengthLevel(entropy: number) {
  const step = fullScaleValue / 6;
  const level = entropy > step * 6 ? 5 : Math.floor(entropy / step);
  return level;
}

function Bar({ color }: BoxProps) {
  return <Box w="0.75em" h="2em" bg={color} border="1px" />;
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

export function StrengthText(props: { entropy: number } & TextProps) {
  const level = strengthLevel(props.entropy);
  return <Text {...props}>{strengthRating[level].rating}</Text>;
}

export function StrengthMeter({
  entropy,
  ...props
}: BoxProps & { entropy: number }) {
  const scaleFillerBg = useColorModeValue(
    strengthRating[strengthLevel(entropy)].color,
    "primary"
  );
  return (
    <Box
      className="strength-meter"
      position="relative"
      display="block"
      w="100%"
      minH="4em"
      {...props}
    >
      <Box
        className="strength-meter__scale"
        {...stretchedBoxProps}
        w={scaleValue(entropy)}
        backgroundColor={scaleFillerBg} // SCALE COLOR
      />
      <Flex
        className="strength-meter__outer"
        {...stretchedBoxProps}
        w="100%"
        zIndex={1}
        {...scaleFlexProps}
      >
        <Flex className="strength-meter__inner" align="center">
          <Tooltip
            // hasArrow
            openDelay={200}
            closeDelay={1000}
            label="TODO: entropy ambiguity disclaimer"
          >
            <Tag>
              ~{entropy} bits of entropy
              <StrengthText fontSize="s" as="i" p=".5em" entropy={entropy} />
            </Tag>
          </Tooltip>
          {/* <Text p="0 0.5em"></Text> */}
          {/* <BarStack entropy={entropy} /> */}
        </Flex>
      </Flex>
    </Box>
  );
}
