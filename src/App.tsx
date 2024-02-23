import "./App.css";
import {
  Box,
  Heading,
  Accordion,
  useStyleConfig,
  // useMediaQuery,
  // HStack,
  // VStack,
  BoxProps,
} from "@chakra-ui/react";
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
      <Control />

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

/* function AppWide(props: BoxProps) {
  return (
    <HStack w="76rem" margin="0 auto" {...props}>
      <VStack w="50%">
        <Heading as="h1" fontSize="3xl" m="0 .5em">
          Secure-Obscure Password Generator
        </Heading>
        <Control />
        <HDT />
        <Miscellaneous />
      </VStack>
      <VStack w="50%" h="100%" display="inline-block">
        <Box maxH="50%" display="inline-block" overflowY="auto">
          <Inclusion />
        </Box>
        <Box maxH="50%" display="inline-block" overflowY="auto">
          <Leetrules />
        </Box>
      </VStack>
    </HStack>
  );
} */

function App() {
  const style = useStyleConfig("App");
  // const isHD = useMediaQuery("(min-width: var(--chakra-breakpoints-lg)");

  // return isHD ? <AppWide __css={style} /> : <AppRegular __css={style} />;
  return <AppRegular __css={style} />;
}

export default App;
