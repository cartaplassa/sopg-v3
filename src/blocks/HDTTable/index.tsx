import { Grid, Radio, Input, Heading, Button } from "@chakra-ui/react";
import { MouseEvent } from "react";
import { ValidCase, ValidSelection } from "./initials";
import gridCoordinates from "./gridCoordinates";
import { useConfigStore, StateType } from "@store/index";
import RadioInput from "@components/RadioInput";
import FlexRadioGroup from "@components/FlexRadioGroup";
import GridRadioGroup from "@components/GridRadioGroup";

export default function HDT({...props}) {
  const table = useConfigStore((state: StateType) => state.config.HDT);

  const changeCase = useConfigStore((state: StateType) => state.changeCase);
  const editCharPool = useConfigStore((state: StateType) => state.editCharPool);
  const setHDTElement = useConfigStore(
    (state: StateType) => state.setHDTElement
  );
  const editHDTCustom = useConfigStore(
    (state: StateType) => state.editHDTCustom
  );

  const logTable = (_: MouseEvent<HTMLButtonElement>) => console.log(table);

  return (
    <Grid {...gridCoordinates.root} gap="4px" {...props}>
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
        value={table.charPool}
        onChange={(e) => editCharPool(e.target.value)}
      />

      {/* HEADER */}

      <Heading {...gridCoordinates.header.heading} as="h3" size="md" m="auto 0">
        Header
      </Heading>
      <FlexRadioGroup
        {...gridCoordinates.header.flexRadioGroup}
        direction={{ base: "column", sm: "row", md: "row" }}
        value={table.header.selected}
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
        direction={{ base: "column", sm: "row", md: "row" }}
        value={table.divider.selected}
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
        direction={{ base: "column", sm: "row", md: "row" }}
        value={table.tail.selected}
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
        value={table.case}
        onChange={(value) => changeCase(value as ValidCase)}
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
