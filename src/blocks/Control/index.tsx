import { type ReactNode, useCallback } from "react";
import { Box, Grid, Button } from "@chakra-ui/react";
import { useImmerReducer } from "use-immer";

import { LuDices as DiceIcon } from "react-icons/lu";

import { generatePassword } from "@utils/passGen";
import { useConfigStore, StateType, initialConfig } from "@store/index";

import getPasswordReducer from "./passwordReducer";

import { StrengthMeter } from "@components/StrengthMeter";
import CopyButton from "@components/buttons/CopyButton";
import OutputItem from "@components/OutputItem";
import StyledIcon from "@components/StyledIcon";

const initialPassword = generatePassword(initialConfig);

export default function Control() {
  const config = useConfigStore((state: StateType) => state.config);

  const [password, dispatch] = useImmerReducer(
    getPasswordReducer(config),
    initialPassword
  );

  const handleHeader = useCallback(() => dispatch({ type: "header" }), []);
  const handleDivider = useCallback(() => dispatch({ type: "divider" }), []);
  const handleTail = useCallback(() => dispatch({ type: "tail" }), []);
  const handleWord = useCallback(
    (id: number) => dispatch({ type: "word", id: id }),
    []
  );
  const handleRegen = useCallback(() => dispatch({ type: "regen" }), []);

  return (
    <Box p="1em">
      <Box
        mb={4}
        border="2px"
        borderColor="secondary"
        rounded="md"
        overflow="hidden"
      >
        <Box
          className="output-box"
          p={4}
          minH="5em"
          fontSize="2xl"
          wordBreak="break-all"
          textAlign="left"
          userSelect="none"
          borderBottomWidth="2px"
          borderColor="secondary"
        >
          <OutputItem onClick={handleHeader} value={password.header} />
          {password.words
            .map<ReactNode>((word, index) => (
              <OutputItem
                key={"word-" + Date.now() + index}
                onClick={() => handleWord(index)}
                value={word}
              />
            ))
            .reduce((acc, curr, index) => [
              acc,
              <OutputItem
                key={"divider-" + Date.now() + index}
                onClick={handleDivider}
                value={password.divider}
              />,
              curr,
            ])}
          <OutputItem onClick={handleTail} value={password.tail} />
        </Box>

        <StrengthMeter entropy={password.entropy} />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button leftIcon={<StyledIcon as={DiceIcon} />} onClick={handleRegen}>
          Generate
        </Button>
        <CopyButton valueToCopy={password.joined} />
      </Grid>
    </Box>
  );
}
