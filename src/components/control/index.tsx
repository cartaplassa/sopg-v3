import { useCallback } from "react";
import { Box, Text, Grid, Button } from "@chakra-ui/react";
import { StrengthMeter } from "./strengthMeter";
import {
  generatePassword,
  wordGen,
  joinPassword,
  randomItem,
  Password,
} from "@utils/passGen";
import { useConfigStore, State } from "@store/index";
import { useImmerReducer } from "use-immer";
import { passwordEntropy } from "@utils/passwordEntropy";
import { IconGenerate, IconCopy } from "@icons/index";

const displayPasswordAs = "kbd";

export default function Control() {
  const config = useConfigStore((state: State) => state.config);
  const initialPassword = generatePassword(config);

  const passwordReducer = (
    draft: Password,
    action: { type: string; id?: number }
  ) => {
    switch (action.type) {
      case "regen":
        return generatePassword(config);
      case "word":
        if (action.id != null) {
          draft.words[action.id] = wordGen(
            draft.config.words[action.id].partOfSpeech,
            draft.config
          );
          draft.joined = joinPassword(draft);
          draft.entropy = passwordEntropy(draft.joined);
        } else {
          throw new Error('Action "word" w/o ID');
        }
        return draft;
      case "header":
        draft.header =
          draft.config.HDT.header.selected === "random"
            ? randomItem(draft.config.HDT.charPool)
            : draft.header;
        draft.divider =
          draft.config.HDT.divider.selected === "match"
            ? draft.header
            : draft.divider;
        draft.tail =
          draft.config.HDT.tail.selected === "match"
            ? draft.header
            : draft.tail;
        draft.joined = joinPassword(draft);
        draft.entropy = passwordEntropy(draft.joined);
        return draft;
      case "divider":
        if (draft.config.HDT.divider.selected === "random")
          draft.divider = randomItem(draft.config.HDT.charPool);
        else if (
          draft.config.HDT.divider.selected === "match" &&
          draft.config.HDT.header.selected === "random"
        ) {
          draft.header = randomItem(draft.config.HDT.charPool);
          draft.divider = draft.header;
          if (draft.config.HDT.tail.selected === "match")
            draft.tail = draft.header;
        }
        draft.joined = joinPassword(draft);
        draft.entropy = passwordEntropy(draft.joined);
        return draft;
      case "tail":
        if (draft.config.HDT.tail.selected === "random")
          draft.tail = randomItem(draft.config.HDT.charPool);
        else if (
          draft.config.HDT.tail.selected === "match" &&
          draft.config.HDT.header.selected === "random"
        ) {
          draft.header = randomItem(draft.config.HDT.charPool);
          if (draft.config.HDT.divider.selected === "match")
            draft.divider = draft.header;
          draft.tail = draft.header;
        }
        draft.joined = joinPassword(draft);
        draft.entropy = passwordEntropy(draft.joined);
        return draft;
      default:
        throw new Error("Unknown action at Password");
    }
  };

  const [password, dispatch] = useImmerReducer(
    passwordReducer,
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
    <Box p="1rem">
      <Box mb={4} boxShadow="base" rounded="md" overflow="hidden">
        <Box p={4} fontSize="2xl" wordBreak="break-all" textAlign="left">
          <Text as={displayPasswordAs} onClick={handleHeader}>
            {password.header}
          </Text>
          {password.words
            .map<React.ReactNode>((word, index) => (
              <Text
                as={displayPasswordAs}
                key={"word-" + Date.now() + index}
                onClick={() => handleWord(index)}
              >
                {word}
              </Text>
            ))
            .reduce((acc, curr, index) => [
              acc,
              <Text
                as={displayPasswordAs}
                key={"divider-" + Date.now() + index}
                onClick={handleDivider}
              >
                {password.divider}
              </Text>,
              curr,
            ])}
          <Text as={displayPasswordAs} onClick={handleTail}>
            {password.tail}
          </Text>
        </Box>
        <StrengthMeter entropy={password.entropy} />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button leftIcon={<IconGenerate />} onClick={handleRegen}>
          Generate
        </Button>
        <Button leftIcon={<IconCopy />}>Copy</Button>
      </Grid>
    </Box>
  );
}
