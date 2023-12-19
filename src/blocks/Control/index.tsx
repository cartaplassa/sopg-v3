import { useCallback } from "react";
import { Box, Grid, Button } from "@chakra-ui/react";
import { useImmerReducer } from "use-immer";

import { Dice5 as Dice5Icon } from "@chakra-icons/bootstrap";

import {
  generatePassword,
  wordGen,
  joinPassword,
  randomItem,
  Password,
} from "@utils/passGen";
import { useConfigStore, StateType, initialConfig } from "@store/index";
import { passwordEntropy } from "@utils/passwordEntropy";

import showErrorToast from "@utils/showErrorToast";

import { StrengthMeter } from "@components/StrengthMeter";
import CopyButton from "@components/buttons/CopyButton";
import OutputItem from "@components/OutputItem";

function hasNoToggledItems(arr: { isToggled: boolean }[]) {
  return arr.filter((item: any) => item.isToggled === true).length === 0;
}

const initialPassword = generatePassword(initialConfig);

export default function Control() {
  const config = useConfigStore((state: StateType) => state.config);

  const passwordReducer = (
    draft: Password,
    action: { type: string; id?: number }
  ) => {
    switch (action.type) {
      case "regen":
        return generatePassword(config);
      case "word":
        if (action.id == null) {
          const errorText = 'Action "word" is called w/o ID';
          showErrorToast(errorText);
          return draft;
        }
        if (hasNoToggledItems(draft.config.words)) {
          const errorText = "Included words list is empty";
          showErrorToast(errorText);
          return draft;
        }
        if (draft.config.words[action.id] == null) {
          const errorText = 'Action "word": ID mismatch, fix config';
          showErrorToast(errorText);
          return draft;
        }
        draft.words[action.id] = wordGen(
          draft.config.words[action.id].partOfSpeech,
          draft.config
        );
        draft.joined = joinPassword(draft);
        draft.entropy = passwordEntropy(draft.joined);
        return draft;
      case "header":
        if (hasNoToggledItems(draft.config.words)) {
          const errorText = "Included words list is empty";
          showErrorToast(errorText);
          return draft;
        }
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
        if (hasNoToggledItems(draft.config.words)) {
          const errorText = "Included words list is empty";
          showErrorToast(errorText);
          return draft;
        }
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
        if (hasNoToggledItems(draft.config.words)) {
          const errorText = "Included words list is empty";
          showErrorToast(errorText);
          return draft;
        }
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
        const errorText = "Unknown action at Password";
        showErrorToast(errorText);
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
    <Box p="1em">
      <Box
        mb={4}
        border="2px"
        borderColor="gray.500"
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
        >
          <OutputItem onClick={handleHeader} value={password.header} />
          {password.words
            .map<React.ReactNode>((word, index) => (
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
        <Button leftIcon={<Dice5Icon />} onClick={handleRegen}>
          Generate
        </Button>
        <CopyButton valueToCopy={password.joined} />
      </Grid>
    </Box>
  );
}
