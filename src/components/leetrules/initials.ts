export interface Rule {
  id: number;
  ruleFrom: string;
  ruleTo: string;
  toggled: boolean;
}

export const initialRules: Rule[] = [
  { id: 0, ruleFrom: "I,i", ruleTo: "1", toggled: true },
  { id: 1, ruleFrom: "A,a", ruleTo: "4", toggled: true },
  { id: 2, ruleFrom: "O,o", ruleTo: "0", toggled: true },
  { id: 3, ruleFrom: "B,b", ruleTo: "8", toggled: true },
  { id: 4, ruleFrom: "S,s", ruleTo: "$", toggled: true },
  { id: 5, ruleFrom: "L,l", ruleTo: "!", toggled: true },
];
