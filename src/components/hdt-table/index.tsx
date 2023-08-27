import {
  Grid,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Input,
  Heading,
  Flex,
  FlexProps,
  Button,
  GridProps,
} from "@chakra-ui/react";
import { useState, MouseEvent, ChangeEvent, FormEvent } from "react";
import gridCoordinates from "./gridCoordinates";

type Selection = "custom" | "random" | "match";

function isValidSelection(arg: any): arg is Selection {
  return ["custom", "random", "match"].includes(arg as Selection);
}

type Case = "lowercase" | "capitalize" | "uppercase" | "reversecap";

function isValidCase(arg: any): arg is Case {
  return ["lowercase", "capitalize", "uppercase", "reversecap"].includes(
    arg as Case
  );
}

interface HDTData {
  header: {
    custom: string;
    selected: Selection;
  };
  divider: {
    custom: string;
    selected: Selection;
  };
  tail: {
    custom: string;
    selected: Selection;
  };
  charPool: string;
  case: Case;
}

const initialHDTData: HDTData = {
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
};

interface RadioInputProps extends FlexProps {
  value: string;
  inputValue: string;
  inputOnChange: React.ChangeEventHandler<HTMLInputElement>;
}

function RadioInput({
  flex,
  value,
  inputValue,
  inputOnChange,
  gridColumn,
  gridRow,
}: RadioInputProps) {
  return (
    <Flex gridColumn={gridColumn} gridRow={gridRow} flex={flex}>
      <Radio value={value} />
      <Input flexGrow="1" defaultValue={inputValue} onChange={inputOnChange} />
    </Flex>
  );
}

function FlexRadioGroup({
  children,
  defaultValue,
  onChange,
  gridColumn,
  gridRow,
  direction,
}: RadioGroupProps & FlexProps) {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      onChange={onChange}
      gridColumn={gridColumn}
      gridRow={gridRow}
    >
      <Flex w="100%" h="100%" direction={direction}>
        {children}
      </Flex>
    </RadioGroup>
  );
}

function GridRadioGroup({
  children,
  defaultValue,
  onChange,
  gridColumn,
  gridRow,
  gridTemplateColumns,
  gridTemplateRows,
}: RadioGroupProps & GridProps) {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      onChange={onChange}
      gridColumn={gridColumn}
      gridRow={gridRow}
    >
      <Grid
        w="100%"
        h="100%"
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
      >
        {children}
      </Grid>
    </RadioGroup>
  );
}

export default function HDT() {
  const [table, setTable] = useState(initialHDTData);

  const logTable = (_: MouseEvent<HTMLButtonElement>) => console.log(table);

  const handleCharPool = (
    e: ChangeEvent<HTMLInputElement> & {
      target: { value: Selection };
    }
  ) =>
    setTable({
      ...table,
      charPool: e.target.value,
    });

  const handleCustomField = (
    e: ChangeEvent<HTMLInputElement>,
    field: "header" | "divider" | "tail"
  ) => {
    const updatedTable = table;
    updatedTable[field].custom = e.target.value;
    setTable(updatedTable);
  };

  const handleSelected = (
    value: Selection | string | FormEvent<HTMLDivElement>,
    target: "header" | "divider" | "tail"
  ) => {
    if (isValidSelection(value)) {
      const updatedTable = table;
      updatedTable[target].selected = value;
      setTable(updatedTable);
      return;
    }
    throw new TypeError(
      "Passed value " + value + " isn't allowed: not a valid Selection"
    );
  };

  const handleCase = (value: Case | string | FormEvent<HTMLDivElement>) => {
    if (isValidCase(value)) {
      setTable({
        ...table,
        case: value,
      });
      return;
    }
    throw new TypeError(
      "Passed value " + value + " isn't allowed: not a valid Case"
    );
  };

  return (
    <Grid {...gridCoordinates.root} gap="4px">
      {/* CHAR POOL */}
      <Heading
        {...gridCoordinates.charPool.heading}
        as="h3"
        size="md"
        m="auto 0"
      >
        Char pool
      </Heading>
      <Input
        {...gridCoordinates.charPool.input}
        placeholder="Char pool"
        alt="Char pool"
        defaultValue={table.charPool}
        onChange={handleCharPool}
      />
      {/* HEADER */}
      <Heading {...gridCoordinates.header.heading} as="h3" size="md" m="auto 0">
        Header
      </Heading>
      <FlexRadioGroup
        {...gridCoordinates.header.flexRadioGroup}
        direction={["column", "row", "row"]}
        defaultValue="custom"
        onChange={(value) => handleSelected(value, "header")}
      >
        <RadioInput
          flex="1 1 0px"
          value="custom"
          inputValue={table.header.custom}
          inputOnChange={(e) => handleCustomField(e, "header")}
        />
        <Radio flex="1 1 0px" value="random">
          Random
        </Radio>
      </FlexRadioGroup>
      {/* DIVIDER */}
      <Heading
        {...gridCoordinates.divider.heading}
        as="h3"
        size="md"
        m="auto 0"
      >
        Dividers
      </Heading>
      <FlexRadioGroup
        {...gridCoordinates.divider.flexRadioGroup}
        direction={["column", "row", "row"]}
        defaultValue="custom"
        onChange={(value) => handleSelected(value, "divider")}
      >
        <RadioInput
          flex="1 1 0px"
          value="custom"
          inputValue={table.divider.custom}
          inputOnChange={(e) => handleCustomField(e, "divider")}
        />
        <Radio flex="1 1 0px" value="random">
          Random
        </Radio>
        <Radio flex="1 1 0px" value="match">
          Match
        </Radio>
      </FlexRadioGroup>
      {/* TAIL */}
      <Heading {...gridCoordinates.tail.heading} as="h3" size="md" m="auto 0">
        Tails
      </Heading>
      <FlexRadioGroup
        {...gridCoordinates.tail.flexRadioGroup}
        direction={["column", "row", "row"]}
        defaultValue="custom"
        onChange={(value) => handleSelected(value, "tail")}
      >
        <RadioInput
          flex="1 1 0px"
          value="custom"
          inputValue={table.tail.custom}
          inputOnChange={(e) => handleCustomField(e, "tail")}
        />
        <Radio flex="1 1 0px" value="random">
          Random
        </Radio>
        <Radio flex="1 1 0px" value="match">
          Match
        </Radio>
      </FlexRadioGroup>
      {/* CASE */}
      <Heading {...gridCoordinates.case.heading} as="h3" size="md" m="auto 0">
        Case
      </Heading>
      <GridRadioGroup
        defaultValue="capitalize"
        onChange={handleCase}
        {...gridCoordinates.case.gridRadioGroup}
      >
        <Radio value="lowercase">Lowercase</Radio>
        <Radio value="capitalize">Capitalize</Radio>
        <Radio value="uppercase">Uppercase</Radio>
        <Radio value="reversecap">Reverse cap</Radio>
      </GridRadioGroup>

      {/* DEBUG */}

      <Button onClick={logTable} {...gridCoordinates.logButton}>
        [DEBUG] Log
      </Button>
    </Grid>
  );
}
