import { useCallback, useState } from "react";
import { Box, Text, Grid, Button, TextProps } from "@chakra-ui/react";
import { useImmerReducer } from "use-immer";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { StrengthMeter } from "./strengthMeter";
import {
  generatePassword,
  wordGen,
  joinPassword,
  randomItem,
  Password,
} from "@utils/passGen";
import { useConfigStore, StateType } from "@store/index";
import { passwordEntropy } from "@utils/passwordEntropy";
import { Dice5, Clipboard, ClipboardCheckFill } from "@chakra-icons/bootstrap";

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

function CopyButton({ valueToCopy }: { valueToCopy: string }) {
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonIcon, setButtonIcon] = useState(<Clipboard />);

  const onCopy = useCallback(() => {
    setButtonText("Copied!");
    setButtonIcon(<ClipboardCheckFill />);
    setTimeout(() => {
      setButtonText("Copy");
      setButtonIcon(<Clipboard />);
    }, 3000);
  }, []);

  return (
    <CopyToClipboard onCopy={onCopy} text={valueToCopy}>
      <Button leftIcon={buttonIcon}>{buttonText}</Button>
    </CopyToClipboard>
  );
}

export default function Control() {
  const config = useConfigStore((state: StateType) => state.config);
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
          <Text onClick={handleHeader} {...outputItemProps}>
            {password.header}
          </Text>
          {password.words
            .map<React.ReactNode>((word, index) => (
              <Text
                key={"word-" + Date.now() + index}
                onClick={() => handleWord(index)}
                {...outputItemProps}
              >
                {word}
              </Text>
            ))
            .reduce((acc, curr, index) => [
              acc,
              <Text
                key={"divider-" + Date.now() + index}
                onClick={handleDivider}
                {...outputItemProps}
              >
                {password.divider}
              </Text>,
              curr,
            ])}
          <Text onClick={handleTail} {...outputItemProps}>
            {password.tail}
          </Text>
        </Box>

        <StrengthMeter entropy={password.entropy} />
      </Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Button leftIcon={<Dice5 />} onClick={handleRegen}>
          Generate
        </Button>
        <CopyButton valueToCopy={password.joined} />
      </Grid>
    </Box>
  );
}
