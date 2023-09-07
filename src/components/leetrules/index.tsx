import {
  Flex,
  FlexProps,
  Switch,
  Input,
  Text,
  CloseButton,
  Button,
  Box,
  Grid,
} from "@chakra-ui/react";
import { useState, MouseEvent, ChangeEvent } from "react";

interface Rule {
  id: number;
  ruleFrom: string;
  ruleTo: string;
  toggled: boolean;
}

export const initialRules: Rule[] = [
  { id: Date.now(), ruleFrom: "I,i", ruleTo: "1", toggled: true },
  { id: Date.now() + 1, ruleFrom: "A,a", ruleTo: "4", toggled: true },
  { id: Date.now() + 2, ruleFrom: "O,o", ruleTo: "0", toggled: true },
  { id: Date.now() + 3, ruleFrom: "B,b", ruleTo: "8", toggled: true },
  { id: Date.now() + 4, ruleFrom: "S,s", ruleTo: "$", toggled: true },
  { id: Date.now() + 5, ruleFrom: "L,l", ruleTo: "!", toggled: true },
];
//
interface LeetruleProps extends FlexProps {
  ruleFrom: string;
  editRuleFrom: React.ChangeEventHandler<HTMLInputElement>;
  ruleTo: string;
  editRuleTo: React.ChangeEventHandler<HTMLInputElement>;
  removeRule: React.MouseEventHandler<HTMLButtonElement>;
  toggleRule: React.ChangeEventHandler<HTMLInputElement>;
}

function Leetrule({
  ruleFrom,
  editRuleFrom,
  ruleTo,
  editRuleTo,
  removeRule,
  toggleRule,
}: LeetruleProps) {
  return (
    <Flex className="leetrule" align="center">
      <Switch onChange={toggleRule} defaultChecked />
      <Input
        defaultValue={ruleFrom}
        onChange={editRuleFrom}
        width="fit-content"
        htmlSize={1}
        flexGrow="7"
      />
      <Text>⟶</Text>
      <Input
        defaultValue={ruleTo}
        onChange={editRuleTo}
        width="fit-content"
        htmlSize={1}
        flexGrow="2"
      />
      <CloseButton onClick={removeRule} />
    </Flex>
  );
}

export default function Leetrules() {
  const [rules, setRules] = useState(initialRules);

  const logRules = (_: MouseEvent<HTMLButtonElement>) => console.log(rules);
  const addRule = (_: MouseEvent<HTMLButtonElement>) =>
    setRules([
      ...rules,
      { id: Date.now(), ruleFrom: "", ruleTo: "", toggled: true },
    ]);
  const removeRule = (_: MouseEvent<HTMLButtonElement>, index: number) =>
    setRules(rules.filter((_, i) => i !== index));
  const editRuleFrom = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedRules = [...rules];
    updatedRules[index].ruleFrom = e.target.value;
    setRules(updatedRules);
  };
  const editRuleTo = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedRules = [...rules];
    updatedRules[index].ruleTo = e.target.value;
    setRules(updatedRules);
  };
  const toggleRule = (_: ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedRules = [...rules];
    updatedRules[index].toggled = !updatedRules[index].toggled;
    setRules(updatedRules);
  };

  return (
    <Box>
      <Grid gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
        {rules.map((rule: Rule, index: number) => (
          <Leetrule
            key={rule.id}
            ruleFrom={rule.ruleFrom}
            editRuleFrom={(e) => editRuleFrom(e, index)}
            ruleTo={rule.ruleTo}
            editRuleTo={(e) => editRuleTo(e, index)}
            removeRule={(e) => removeRule(e, index)}
            toggleRule={(e) => toggleRule(e, index)}
          />
        ))}
      </Grid>
      <Button w="full" onClick={(e) => addRule(e)}>
        +
      </Button>
      <Button w="full" onClick={(e) => logRules(e)}>
        [DEBUG] Log
      </Button>
    </Box>
  );
}
