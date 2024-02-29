import "./App.css";
import {
  Box,
  Heading,
  Accordion,
  useStyleConfig,
  useMediaQuery,
  HStack,
  VStack,
  BoxProps,
} from "@chakra-ui/react";

import { breakpoints } from "@theme";

import Control from "@blocks/Control";
import HDT from "@blocks/HDTTable";
import Inclusion from "@blocks/Inclusion";
import Leetrules from "@blocks/Leetrules";
import Miscellaneous from "@blocks/Miscellaneous";
import AccordionBlock from "@components/AccordionBlock";


function AppRegular(props: BoxProps) {
  return (
    <Box
      w={{ base: "100%", sm: "100%", md: "38rem" }}
      m="0 auto"
      p="1.75em 0 0 0"
      {...props}
    >
      <Heading as="h1" fontSize="3xl" m="0 .5em">
        Secure-Obscure Password Generator
      </Heading>
      <Control p="1em" />

      <Accordion allowToggle>
        <AccordionBlock title="Division">
          <HDT />
        </AccordionBlock>
        <AccordionBlock title="Inclusion">
          <Inclusion />
        </AccordionBlock>
        <AccordionBlock title="Leetrules">
          <Leetrules />
        </AccordionBlock>
        <AccordionBlock title="Miscellaneous">
          <Miscellaneous />
        </AccordionBlock>
      </Accordion>
    </Box>
  );
}

function AppWide(props: BoxProps) {
  const border = "1px solid var(--chakra-colors-secondary)";
  return (
    <HStack
      w="76rem"
      margin="0 auto"
      p="1.75em 1em 1.25em"
      align="stretch"
      gap="0"
      {...props}
    >
      <VStack
        w="50%"
        flex="1 1 0px"
        align="stretch"
        borderRight={border}
        p="0 .5em"
      >
        <Heading as="h1" fontSize="3xl" m="0 .5em">
          Secure-Obscure Password Generator
        </Heading>
        <Control p="0 0 .5em" borderBottom={border} />
        <HDT borderBottom={border} />
        <Miscellaneous />
      </VStack>
      <VStack w="50%" maxH="100%" flex="1 1 0px" align="stretch" gap="0" p="0 0 0 .5em">
        <Box maxH="50%" overflowY="scroll" flex="1 1 0px" p="0 0 .5em" borderBottom={border}>
          <Inclusion />
        </Box>
        <Box maxH="50%" overflowY="scroll" flex="1 1 0px" p=".5em 0 0">
          <Leetrules />
        </Box>
      </VStack>
    </HStack>
  );
}

function App() {
  const style = useStyleConfig("App");
  const [isHD] = useMediaQuery(`(min-width: ${breakpoints.lg})`);

  return isHD ? <AppWide __css={style} /> : <AppRegular __css={style} />;
  // return <AppRegular __css={style} />;
}

export default App;
