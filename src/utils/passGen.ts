import { ValidTarget } from "@components/hdt-table/initials.js";
import { wordlist } from "./wordlist.js";
import { Config } from "@store/index.js";
import { Rule } from "@components/leetrules/initials.js";

const validateInput = (config: Config) => {
  // At least one box is checked
  if (
    config.words.filter((item: any) => item.toggled === true).length === 0 ||
    config.leetrules.filter((item: any) => item.toggled === true).length === 0
  ) {
    throw new Error("Make sure to check at least one box");
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

function randomItem(iterable: any[] | string) {
  return iterable[Math.floor(Math.random() * iterable.length)];
}

const generatePassword = (config: Config) => {
  try {
    validateInput(config);

    // Getting HDT config
    let HDT = {};
    ["header", "divider", "tail"].forEach((selection) => {
      switch (config.HDT[selection as ValidTarget].selected) {
        case "custom":
          //@ts-ignore
          HDT[selection] = config.HDT[selection as ValidTarget].custom;
          break;
        case "random":
          //@ts-ignore
          HDT[selection] = randomItem(config.HDT.charPool);
          break;
        case "match":
          if (selection === "header")
            throw new Error("Generation error: Header is set to match itself");
          //@ts-ignore
          HDT[selection] = HDT["header"];
          break;
        default:
          throw new Error("Generation error: Invalid HDT option");
      }
    });

    let passwordList: string[] = [];
    config.words.forEach((word) => {
      if (word.toggled) {
        let randomWord = randomItem(wordlist[word.partOfSpeech]);

        switch (config.HDT.case) {
          case "lowercase":
            break;
          case "capitalize":
            randomWord =
              randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
            break;
          case "uppercase":
            randomWord = randomWord.toUpperCase();
            break;
          case "reversecap":
            randomWord =
              randomWord.charAt(0) + randomWord.slice(1).toUpperCase();
            break;
          default:
            throw new Error("Generation error: invalid case");
        }

        randomWord = leetify(randomWord, config.leetrules);

        passwordList.push(randomWord);
      }
    });

    // Making password string
    //@ts-ignore
    return HDT.header + passwordList.join(HDT.divider) + HDT.tail;
  } catch (err) {
    console.log(err);
    return "";
  }
};

export default generatePassword;
