import {
  Flex,
  FlexProps,
  Switch,
  Text,
  Select,
  CloseButton,
  Grid,
  Box,
  Button,
} from "@chakra-ui/react";
import { MouseEvent } from "react";
import { PartOfSpeech, Word } from "./initials";
import { useConfigStore, State } from "@store/index";

interface IncludedWordProps extends FlexProps {
  index: number;
  partOfSpeech: PartOfSpeech;
  handleWordChange: React.ChangeEventHandler<HTMLSelectElement>;
  removeWord: React.MouseEventHandler<HTMLButtonElement>;
  toggleWord: React.ChangeEventHandler<HTMLInputElement>;
}

function IncludedWord({
  partOfSpeech,
  index,
  handleWordChange,
  removeWord,
  toggleWord,
}: IncludedWordProps) {
  return (
    <Flex align="center">
      <Text>{index + 1}</Text>
      <Switch onChange={toggleWord} defaultChecked />
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
  const words = useConfigStore((state: State) => state.config.words);

  const addWord = useConfigStore((state: State) => state.addWord);
  const removeWord = useConfigStore((state: State) => state.removeWord);
  const setWord = useConfigStore((state: State) => state.setWord);
  const toggleWord = useConfigStore((state: State) => state.toggleWord);

  const logWords = (_: MouseEvent<HTMLButtonElement>) =>
    console.log(words.filter((word: Word) => word.partOfSpeech));

  return (
    <Box>
      <Grid gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
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
      </Grid>
      <Button w="full" onClick={addWord}>
        +
      </Button>
      <Button hidden w="full" onClick={(e) => logWords(e)}>
        [DEBUG] Log
      </Button>
    </Box>
  );
}
