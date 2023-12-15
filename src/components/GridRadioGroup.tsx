import { Grid, RadioGroup, RadioGroupProps, GridProps } from "@chakra-ui/react";

export default function GridRadioGroup({
  children,
  value,
  onChange,
  gridColumn,
  gridRow,
  gridTemplateColumns,
  gridTemplateRows,
}: RadioGroupProps & GridProps) {
  return (
    <RadioGroup
      value={value}
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
