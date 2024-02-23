import showErrorToast from "@utils/showErrorToast";
import { type ConfigType } from "@store/index.tsx";
import {
  generatePassword,
  wordGen,
  joinPassword,
  randomItem,
  type Password,
} from "@utils/passGen";
import { passwordEntropy } from "@utils/passwordEntropy";

function hasNoToggledItems(arr: { isToggled: boolean }[]) {
  return arr.filter((item: any) => item.isToggled === true).length === 0;
}

const getPasswordReducer = (config: ConfigType) => {
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
  return passwordReducer;
};

export default getPasswordReducer;
