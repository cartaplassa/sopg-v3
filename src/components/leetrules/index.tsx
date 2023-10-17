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
import { MouseEvent } from "react";
import { useConfigStore, State } from "@store/index";
import { Rule } from "./initials";

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
  // const [rules, setRules] = useState(initialRules);
  const rules = useConfigStore((state: State) => state.config.leetrules);

  const addRule = useConfigStore((state: State) => state.addRule);
  const removeRule = useConfigStore((state: State) => state.removeRule);
  const editRuleFrom = useConfigStore((state: State) => state.editRuleFrom);
  const editRuleTo = useConfigStore((state: State) => state.editRuleTo);
  const toggleRule = useConfigStore((state: State) => state.toggleRule);

  const logRules = (_: MouseEvent<HTMLButtonElement>) => console.log(rules);

  return (
    <Box>
      <Grid gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
        {rules.map((rule: Rule) => (
          <Leetrule
            key={rule.id}
            ruleFrom={rule.ruleFrom}
            editRuleFrom={(e) => editRuleFrom(e.target.value, rule.id)}
            ruleTo={rule.ruleTo}
            editRuleTo={(e) => editRuleTo(e.target.value, rule.id)}
            removeRule={(_) => removeRule(rule.id)}
            toggleRule={(_) => toggleRule(rule.id)}
          />
        ))}
      </Grid>
      <Button w="full" onClick={(_) => addRule()}>
        +
      </Button>
      <Button hidden w="full" onClick={(e) => logRules(e)}>
        [DEBUG] Log
      </Button>
    </Box>
  );
}
