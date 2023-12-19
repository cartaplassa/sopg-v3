import "./App.css";
import { Box, Heading, Accordion, useStyleConfig } from "@chakra-ui/react";
import Control from "@blocks/Control";
import HDT from "@blocks/HDTTable";
import Inclusion from "@blocks/Inclusion";
import Leetrules from "@blocks/Leetrules";
import Miscellaneous from "@blocks/Miscellaneous";
import AccordionBlock from "@components/AccordionBlock";

function App() {
  const style = useStyleConfig("App");

  return (
    <Box
      boxShadow="dark-lg"
      rounded="md"
      pt="2em"
      w={{ base: "100%", sm: "100%", md: 600 }}
      margin="0 auto"
      __css={style}
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

export default App;
