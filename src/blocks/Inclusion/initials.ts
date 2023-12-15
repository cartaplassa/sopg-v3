export type PartOfSpeech = "adjective" | "adverb" | "noun" | "verb";
export const isValidPartOfSpeech = (value: any): value is PartOfSpeech =>
  ["adjective", "adverb", "noun", "verb"].includes(value);

export interface Word {
  id: number;
  partOfSpeech: PartOfSpeech;
  isToggled: boolean;
}

export const readWord = (input: unknown): Word | Error => {
  if (input == null || typeof input !== "object")
    return new TypeError("Word parser: only object can be parsed");

  const output: Word = {
    id: 0,
    partOfSpeech: "adjective",
    isToggled: false,
  };

  if (!isNaN(Number((input as any).id))) output.id = Number((input as any).id);
  else return new Error("Word parser: faulty id entry");

  if (isValidPartOfSpeech((input as any).partOfSpeech))
    output.partOfSpeech = (input as any).partOfSpeech;
  else return new Error("Word parser: faulty part of speech entry");

  if (typeof (input as any).isToggled === "boolean")
    output.isToggled = (input as any).isToggled;
  else return new Error("Word parser: faulty isToggled entry");

  return output;
};

export const initialWords: Word[] = [
  { id: 0, partOfSpeech: "adjective", isToggled: true },
  { id: 1, partOfSpeech: "noun", isToggled: true },
  { id: 2, partOfSpeech: "verb", isToggled: true },
  { id: 3, partOfSpeech: "adverb", isToggled: true },
];
