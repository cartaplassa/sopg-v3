export type ValidSelection = "custom" | "random" | "match";
export type ValidCase = "lowercase" | "capitalize" | "uppercase" | "reversecap";
export type ValidTarget = "header" | "divider" | "tail";

export interface HDTData {
  header: {
    custom: string;
    selected: ValidSelection;
  };
  divider: {
    custom: string;
    selected: ValidSelection;
  };
  tail: {
    custom: string;
    selected: ValidSelection;
  };
  charPool: string;
  case: ValidCase;
  leetify: boolean;
}

export const initialHDTData: HDTData = {
  header: {
    custom: "~",
    selected: "custom",
  },
  divider: {
    custom: "-",
    selected: "custom",
  },
  tail: {
    custom: "#",
    selected: "custom",
  },
  charPool: "~!@#%^&*/|\\-+=",
  case: "capitalize",
  leetify: true,
};
