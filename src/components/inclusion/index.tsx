import {
  Flex,
  FlexProps,
  Switch,
  Select,
  CloseButton,
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import { MouseEvent } from "react";
import { PartOfSpeech, Word } from "./initials";
import { useConfigStore, StateType } from "@store/index";

interface IncludedWordProps extends FlexProps {
  index: number;
  partOfSpeech: PartOfSpeech;
  handleWordChange: React.ChangeEventHandler<HTMLSelectElement>;
  removeWord: React.MouseEventHandler<HTMLButtonElement>;
  toggleWord: React.ChangeEventHandler<HTMLInputElement>;
}

function IncludedWord({
  partOfSpeech,
  //@ts-ignore
  index,
  handleWordChange,
  removeWord,
  toggleWord,
}: IncludedWordProps) {
  return (
    <Flex w="100%" align="center">
      {/* <Text>{index + 1}</Text> */}
      <Switch mr=".5rem" onChange={toggleWord} defaultChecked />
      <Select
        defaultValue={partOfSpeech}
        onChange={handleWordChange}
        variant="outline"
        placeholder="Choose part of speech"
      >
        <option value="adjective">Adjective</option>
        <option value="noun">Noun</option>
        <option value="verb">Verb</option>
        <option value="adverb">Adverb</option>
      </Select>
      <CloseButton onClick={removeWord} />
    </Flex>
  );
}

export default function Inclusion() {
  // const [words, setWords] = useState(initialWords);
  const words = useConfigStore((state: StateType) => state.config.words);

  const addWord = useConfigStore((state: StateType) => state.addWord);
  const removeWord = useConfigStore((state: StateType) => state.removeWord);
  const setWord = useConfigStore((state: StateType) => state.setWord);
  const toggleWord = useConfigStore((state: StateType) => state.toggleWord);

  const logWords = (_: MouseEvent<HTMLButtonElement>) =>
    console.log(words.filter((word: Word) => word.partOfSpeech));

  return (
    <Box>
      {/* <Grid gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}> */}
      <VStack>
        {words.map((word: Word, index: number) => (
          <IncludedWord
            key={word.id}
            partOfSpeech={word.partOfSpeech}
            index={index}
            handleWordChange={(e) =>
              setWord(e.target.value as PartOfSpeech, word.id)
            }
            removeWord={(_) => removeWord(word.id)}
            toggleWord={(_) => toggleWord(word.id)}
          />
        ))}
      </VStack>
      <Button mt=".5rem" w="full" onClick={addWord}>
        +
      </Button>
      <Button hidden w="full" onClick={(e) => logWords(e)}>
        [DEBUG] Log
      </Button>
    </Box>
  );
}