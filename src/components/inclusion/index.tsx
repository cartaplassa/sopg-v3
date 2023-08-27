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
import { useState, MouseEvent, ChangeEvent } from "react";

interface Word {
  id: number;
  partOfSpeech: "adjective" | "adverb" | "noun" | "verb";
  toggled: boolean;
}

const initialWords: Word[] = [
  { id: Date.now(), partOfSpeech: "adjective", toggled: true },
  { id: Date.now() + 1, partOfSpeech: "noun", toggled: true },
  { id: Date.now() + 2, partOfSpeech: "verb", toggled: true },
  { id: Date.now() + 3, partOfSpeech: "adverb", toggled: true },
];

interface IncludedWordProps extends FlexProps {
  index: number;
  partOfSpeech: "adjective" | "adverb" | "noun" | "verb";
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
  const [words, setWords] = useState(initialWords);

  const logWords = (_: MouseEvent<HTMLButtonElement>) =>
    console.log(words.filter((word) => word.partOfSpeech));
  const addWord = (_: MouseEvent<HTMLButtonElement>) =>
    setWords([
      ...words,
      { id: Date.now(), partOfSpeech: "noun", toggled: true },
    ]);
  const removeWord = (_: MouseEvent<HTMLButtonElement>, index: number) =>
    setWords(words.filter((_, i) => i !== index));
  const handleWordChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedWords = [...words];
    //@ts-ignore
    updatedWords[index].partOfSpeech = e.target.value;
    setWords(updatedWords);
  };
  const toggleWord = (_: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedWords = [...words];
    updatedWords[index].toggled = !updatedWords[index].toggled;
    setWords(updatedWords);
  };

  return (
    <Box>
      <Grid gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
        {words.map((word: Word, index: number) => (
          <IncludedWord
            key={word.id}
            partOfSpeech={word.partOfSpeech}
            index={index}
            handleWordChange={(e) => handleWordChange(e, index)}
            removeWord={(e) => removeWord(e, index)}
            toggleWord={(e) => toggleWord(e, index)}
          />
        ))}
      </Grid>
      <Button w="full" onClick={(e) => addWord(e)}>
        +
      </Button>
      <Button w="full" onClick={(e) => logWords(e)}>
        [DEBUG] Log
      </Button>
    </Box>
  );
}
