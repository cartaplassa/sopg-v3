export type ValidSelection = "custom" | "random" | "match";
export const isValidSelection = (value: any): value is ValidSelection =>
  ["custom", "random", "match"].includes(value);
export type ValidCase = "lowercase" | "capitalize" | "uppercase" | "reversecap";
export const isValidCase = (value: any): value is ValidCase =>
  ["lowercase", "capitalize", "uppercase", "reversecap"].includes(value);
export type ValidTarget = "header" | "divider" | "tail";
export const isValidTarget = (value: any): value is ValidTarget =>
  ["header", "divider", "tail"].includes(value);

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

export const readHDTData = (input: unknown): HDTData | Error => {
  if (input == null || typeof input !== "object")
    return new TypeError("HDTData parser: only object can be parsed");

  const output: HDTData = {
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
  };

  (["header", "divider", "tail"] as ValidTarget[]).forEach(
    (field: ValidTarget) => {
      if (
        typeof (input as any)[field] === "object" &&
        typeof (input as any)[field].custom === "string" &&
        isValidSelection((input as any)[field]?.selected)
      ) {
        output[field].custom = (input as any)[field].custom;
        output[field].selected = (input as any)[field].selected;
      } else {
        return new Error(`HDTData parser: faulty ${field} entry`);
      }
    }
  );

  if (typeof (input as any)["charPool"] === "string")
    output.charPool = (input as any)["charPool"];
  else return new Error(`HDTData parser: faulty charPool entry`);
  if (isValidCase((input as any)["case"])) output.case = (input as any)["case"];
  else return new Error(`HDTData parser: faulty case entry`);
  if (
    input.hasOwnProperty("leetify") &&
    typeof (input as any)["leetify"] === "boolean"
  )
    output.leetify = (input as any)["leetify"];
  else return new Error(`HDTData parser: faulty leetify entry`);

  return output;
};

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
