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
import { MouseEvent } from "react";
import { ValidSelection } from "./initials";
import gridCoordinates from "./gridCoordinates";
import { useConfigStore, State } from "@store/index";

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
  const table = useConfigStore((state: State) => state.config.HDT);

  const changeCase = useConfigStore((state: State) => state.changeCase);
  const editCharPool = useConfigStore((state: State) => state.editCharPool);
  const setHDTElement = useConfigStore((state: State) => state.setHDTElement);
  const editHDTCustom = useConfigStore((state: State) => state.editHDTCustom);

  const logTable = (_: MouseEvent<HTMLButtonElement>) => console.log(table);

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
        onChange={(e) => editCharPool(e.target.value)}
      />
      {/* HEADER */}
      <Heading {...gridCoordinates.header.heading} as="h3" size="md" m="auto 0">
        Header
      </Heading>
      <FlexRadioGroup
        {...gridCoordinates.header.flexRadioGroup}
        direction={["column", "row", "row"]}
        defaultValue="custom"
        onChange={(value) => setHDTElement(value as ValidSelection, "header")}
      >
        <RadioInput
          flex="1 1 0px"
          value="custom"
          inputValue={table.header.custom}
          inputOnChange={(e) => editHDTCustom(e.target.value, "header")}
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
        onChange={(value) => setHDTElement(value as ValidSelection, "divider")}
      >
        <RadioInput
          flex="1 1 0px"
          value="custom"
          inputValue={table.divider.custom}
          inputOnChange={(e) => editHDTCustom(e.target.value, "divider")}
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
        onChange={(value) => setHDTElement(value as ValidSelection, "tail")}
      >
        <RadioInput
          flex="1 1 0px"
          value="custom"
          inputValue={table.tail.custom}
          inputOnChange={(e) => editHDTCustom(e.target.value, "tail")}
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
        onChange={(value) => changeCase(value as string)}
        {...gridCoordinates.case.gridRadioGroup}
      >
        <Radio value="lowercase">Lowercase</Radio>
        <Radio value="capitalize">Capitalize</Radio>
        <Radio value="uppercase">Uppercase</Radio>
        <Radio value="reversecap">Reverse cap</Radio>
      </GridRadioGroup>

      {/* DEBUG */}

      <Button hidden onClick={logTable} {...gridCoordinates.logButton}>
        [DEBUG] Log
      </Button>
    </Grid>
  );
}
