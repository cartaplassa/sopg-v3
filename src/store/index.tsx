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
} from "@components/hdt-table/initials";
import {
  initialWords,
  Word,
  PartOfSpeech,
} from "@components/inclusion/initials";
import { initialRules, Rule } from "@components/leetrules/initials";

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
  changeCase: (value: string) => void;
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

export type StateType = {
  config: ConfigType;
} & ActionsType;

export const useConfigStore = create(
  immer<StateType>((set) => ({
    config: initialConfig,
    changeCase: (value: string) =>
      set((state) => {
        state.config.HDT.case = value as ValidCase;
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
            toggled: true,
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
        state.config.words[index].toggled = !state.config.words[index].toggled;
      }),
    addRule: () =>
      set(
        (state) =>
          void state.config.leetrules.push({
            id: Date.now(),
            ruleFrom: "",
            ruleTo: "",
            toggled: true,
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
        state.config.leetrules[index].toggled =
          !state.config.leetrules[index].toggled;
      }),
    toggleLeetify: () =>
      set((state) => {
        state.config.HDT.leetify = !state.config.HDT.leetify;
      }),
  }))
);
