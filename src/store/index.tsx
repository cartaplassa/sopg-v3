// import { useReducer } from "react";
// import { produce } from "immer";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import {
  initialHDTData,
  HDTData,
  ValidSelection,
  ValidCase,
  ValidTarget,
  readHDTData,
} from "@blocks/HDTTable/initials";
import {
  initialWords,
  Word,
  PartOfSpeech,
  readWord,
} from "@blocks/Inclusion/initials";
import { initialRules, readRule, Rule } from "@blocks/Leetrules/initials";

export interface ConfigType {
  HDT: HDTData;
  words: Word[];
  leetrules: Rule[];
}

export const initialConfig: ConfigType = {
  HDT: initialHDTData,
  words: initialWords,
  leetrules: initialRules,
};

type ActionsType = {
  changeCase: (value: ValidCase) => void;
  setConfig: (value: ConfigType) => void;
  editCharPool: (value: string) => void;
  setHDTElement: (value: ValidSelection, target: ValidTarget) => void;
  editHDTCustom: (value: string, target: ValidTarget) => void;
  addWord: () => void;
  removeWord: (index: number) => void;
  setWord: (value: PartOfSpeech, index: number) => void;
  toggleWord: (index: number) => void;
  addRule: () => void;
  removeRule: (index: number) => void;
  editRuleFrom: (value: string, index: number) => void;
  editRuleTo: (value: string, index: number) => void;
  toggleRule: (index: number) => void;
  toggleLeetify: () => void;
};

export function isError(obj: object): obj is Error {
  return Object.prototype.toString.call(obj) === "[object Error]";
}

export function readConfig(input: unknown): ConfigType | Error {
  if (input == null) return new Error("Config parser: nullish input");
  if (typeof input !== "object")
    return new Error("Config parser: not an object");
  const output: ConfigType = {
    HDT: {
      header: {
        custom: "",
        selected: "custom",
      },
      divider: {
        custom: "",
        selected: "custom",
      },
      tail: {
        custom: "",
        selected: "custom",
      },
      charPool: "",
      case: "lowercase",
      leetify: false,
    },
    words: [],
    leetrules: [],
  };

  const parsed = readHDTData((input as any)["HDT"]);
  if (isError(parsed)) return parsed;
  else output.HDT = parsed;

  if ((input as any)["words"].constructor === Array) {
    for (const word in (input as any)["words"]) {
      const parsed = readWord((input as any)["words"][word]);
      if (!isError(parsed)) output.words.push(parsed);
      // Those errors will be ignored for now at least
    }
    // If words is empty ..?
  } else {
    return new Error("Config parser: 'words' is not an array");
  }

  if ((input as any)["leetrules"].constructor === Array) {
    for (const rule in (input as any)["leetrules"]) {
      const parsed = readRule((input as any)["leetrules"][rule]);
      if (!isError(parsed)) output.leetrules.push(parsed);
      // Those errors will be ignored for now at least
    }
    //TODO: If rules is empty ..?
  } else {
    return new Error("Config parser: 'leetrules' is not an array");
  }

  return output;
}

export type StateType = {
  config: ConfigType;
} & ActionsType;

export const useConfigStore = create(
  immer<StateType>((set) => ({
    config: initialConfig,
    setConfig: (value: ConfigType) =>
      set((state) => {
        state.config = value;
      }),
    changeCase: (value: ValidCase) =>
      set((state) => {
        state.config.HDT.case = value;
      }),
    editCharPool: (value: string) =>
      set((state) => {
        state.config.HDT.charPool = value;
      }),
    setHDTElement: (value: ValidSelection, target: ValidTarget) =>
      set((state) => {
        state.config.HDT[target].selected = value;
      }),
    editHDTCustom: (value: string, target: ValidTarget) =>
      set((state) => {
        state.config.HDT[target].custom = value;
      }),
    addWord: () =>
      set(
        (state) =>
          void state.config.words.push({
            id: Date.now(),
            partOfSpeech: "noun",
            isToggled: true,
          })
      ),
    removeWord: (id: number) =>
      set((state) => {
        // console.log("DEBUG: removing word w/ ID:" + id);
        state.config.words = state.config.words.filter(
          (word: Word) => word.id !== id
        );
      }),
    setWord: (value: PartOfSpeech, id: number) =>
      set((state) => {
        // console.log("DEBUG: updating word w/ ID:" + id);
        const index = state.config.words.findIndex((word) => word.id == id);
        // console.log("DEBUG: updating word #" + index);
        state.config.words[index].partOfSpeech = value;
      }),
    toggleWord: (id: number) =>
      set((state) => {
        // console.log("DEBUG: toggling word w/ ID:" + id);
        const index = state.config.words.findIndex((word) => word.id == id);
        // console.log("DEBUG: toggling word #" + index);
        state.config.words[index].isToggled =
          !state.config.words[index].isToggled;
      }),
    addRule: () =>
      set(
        (state) =>
          void state.config.leetrules.push({
            id: Date.now(),
            ruleFrom: "",
            ruleTo: "",
            isToggled: true,
          })
      ),
    removeRule: (id: number) =>
      set((state) => {
        // console.log("DEBUG: removing rule w/ ID:" + id);
        state.config.leetrules = state.config.leetrules.filter(
          (rule: Rule) => rule.id !== id
        );
      }),
    editRuleFrom: (value: string, id: number) =>
      set((state) => {
        // console.log("DEBUG: updating rule w/ ID:" + id);
        const index = state.config.leetrules.findIndex((rule) => rule.id == id);
        // console.log("DEBUG: updating rule #" + index);
        state.config.leetrules[index].ruleFrom = value;
      }),
    editRuleTo: (value: string, id: number) =>
      set((state) => {
        // console.log("DEBUG: updating rule w/ ID:" + id);
        const index = state.config.leetrules.findIndex((rule) => rule.id == id);
        // console.log("DEBUG: updating rule #" + index);
        state.config.leetrules[index].ruleTo = value;
      }),
    toggleRule: (id: number) =>
      set((state) => {
        // console.log("DEBUG: toggling rule w/ ID:" + id);
        const index = state.config.leetrules.findIndex((rule) => rule.id == id);
        // console.log("DEBUG: toggling rule #" + id);
        state.config.leetrules[index].isToggled =
          !state.config.leetrules[index].isToggled;
      }),
    toggleLeetify: () =>
      set((state) => {
        state.config.HDT.leetify = !state.config.HDT.leetify;
      }),
  }))
);
