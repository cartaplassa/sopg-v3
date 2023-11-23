export interface Rule {
  id: number;
  ruleFrom: string;
  ruleTo: string;
  isToggled: boolean;
}

export const readRule = (input: unknown): Rule | Error => {
  if (input == null || typeof input !== "object")
    return new TypeError("Rule parser: only object can be parsed");

  const output: Rule = {
    id: 0,
    ruleFrom: "",
    ruleTo: "",
    isToggled: false,
  };

  if (!isNaN(Number((input as any).id))) output.id = Number((input as any).id);
  else return new Error("Rule parser: faulty id entry");

  if (typeof (input as any).ruleFrom === "string")
    output.ruleFrom = (input as any).ruleFrom;
  else return new Error("Rule parser: faulty ruleFrom entry");

  if (typeof (input as any).ruleFrom === "string")
    output.ruleTo = (input as any).ruleTo;
  else return new Error("Rule parser: faulty ruleTo entry");

  if (typeof (input as any).isToggled === "boolean")
    output.isToggled = (input as any).isToggled;
  else return new Error("Rule parser: faulty isToggled entry");

  return output;
};

export const initialRules: Rule[] = [
  { id: 0, ruleFrom: "I,i", ruleTo: "1", isToggled: true },
  { id: 1, ruleFrom: "A,a", ruleTo: "4", isToggled: true },
  { id: 2, ruleFrom: "O,o", ruleTo: "0", isToggled: true },
  { id: 3, ruleFrom: "B,b", ruleTo: "8", isToggled: true },
  { id: 4, ruleFrom: "S,s", ruleTo: "$", isToggled: true },
  { id: 5, ruleFrom: "L,l", ruleTo: "!", isToggled: true },
];
