export type PartOfSpeech = "adjective" | "adverb" | "noun" | "verb";

export interface Word {
  id: number;
  partOfSpeech: PartOfSpeech;
  toggled: boolean;
}

export const initialWords: Word[] = [
  { id: 0, partOfSpeech: "adjective", toggled: true },
  { id: 1, partOfSpeech: "noun", toggled: true },
  { id: 2, partOfSpeech: "verb", toggled: true },
  { id: 3, partOfSpeech: "adverb", toggled: true },
];
