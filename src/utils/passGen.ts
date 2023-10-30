import { ValidTarget } from "@components/hdt-table/initials.js";
import { wordlist } from "./wordlist.js";
import { ConfigType } from "@store/index.js";
import { Rule } from "@components/leetrules/initials.js";
import { PartOfSpeech } from "@components/inclusion/initials.js";
import { passwordEntropy } from "@utils/passwordEntropy.js";

export type Password = {
  header: string;
  divider: string;
  tail: string;
  words: string[];
  joined: string;
  entropy: number;
  config: ConfigType;
};

const validateInput = (config: ConfigType) => {
  // At least one box is checked
  if (config.words.filter((item: any) => item.toggled === true).length === 0) {
    throw new Error("Included words list is empty");
  }
};

function leetify(str: string, leetrules: Rule[]) {
  let newStr = str;
  for (const leetrule of leetrules) {
    if (leetrule.toggled)
      leetrule.ruleFrom
        .replaceAll(" ", "")
        .split(",")
        .forEach((fromLetter: string) => {
          newStr = newStr.replaceAll(fromLetter, leetrule.ruleTo);
        });
  }
  return newStr;
}

export function randomItem(iterable: any[] | string) {
  return iterable[Math.floor(Math.random() * iterable.length)];
}

export function wordGen(
  partOfSpeech: PartOfSpeech,
  config: ConfigType
): string {
  // Generate
  let word = randomItem(wordlist[partOfSpeech]);
  // Recase
  switch (config.HDT.case) {
    case "lowercase":
      break;
    case "capitalize":
      word = word.charAt(0).toUpperCase() + word.slice(1);
      break;
    case "uppercase":
      word = word.toUpperCase();
      break;
    case "reversecap":
      word = word.charAt(0) + word.slice(1).toUpperCase();
      break;
    default:
      throw new Error("Generation error: invalid case");
  }
  // Leetify
  word = config.HDT.leetify ? leetify(word, config.leetrules) : word;
  // Return
  return word;
}

export const joinPassword = (password: Password) => {
  return (
    password.header + password.words.join(password.divider) + password.tail
  );
};

export const generatePassword = (config: ConfigType, toast?: any): Password => {
  try {
    validateInput(config);

    // Getting HDT config
    const password: Password = {
      header: "",
      divider: "",
      tail: "",
      words: [],
      joined: "",
      entropy: 0,
      config: structuredClone(config),
    };

    ["header", "divider", "tail"].forEach((target) => {
      switch (config.HDT[target as ValidTarget].selected) {
        case "custom":
          password[target as ValidTarget] =
            config.HDT[target as ValidTarget].custom;
          break;
        case "random":
          password[target as ValidTarget] = randomItem(config.HDT.charPool);
          break;
        case "match":
          if (target === "header")
            throw new Error("Generation error: Header is set to match itself");
          password[target as ValidTarget] = password["header"];
          break;
        default:
          throw new Error("Generation error: Invalid HDT option");
      }
    });

    password.words = [];
    config.words.forEach((word) => {
      if (word.toggled) {
        password.words.push(wordGen(word.partOfSpeech, config));
      }
    });

    password.joined = joinPassword(password);
    password.entropy = passwordEntropy(password.joined);

    //@ts-ignore
    return password;
  } catch (err) {
    if (toast != null) toast(err);
    console.log(err);
    const fallbackPassword: Password = {
      header: "",
      divider: " ",
      tail: "",
      words: ["your", "password", "here"],
      joined: "",
      entropy: 0,
      config: {
        HDT: {
          header: { custom: "", selected: "custom" },
          divider: { custom: " ", selected: "custom" },
          tail: { custom: "", selected: "custom" },
          charPool: "",
          case: "lowercase",
          leetify: false,
        },
        words: [],
        leetrules: [],
      },
    };
    return fallbackPassword;
  }
};
