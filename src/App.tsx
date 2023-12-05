import "./App.css";
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import Control from "./components/control";
import HDT from "./components/hdt-table";
import Inclusion from "./components/inclusion";
import Leetrules from "./components/leetrules";
import Miscellaneous from "./components/miscellaneous";

function App() {
  return (
    <Box
      className="app__inner"
      bg="white"
      boxShadow="dark-lg"
      rounded="md"
      pt="2rem"
      w={{ base: "100%", sm: "100%", md: 600 }}
      margin="0 auto"
    >
      <Heading as="h1" fontSize="3xl" m="0 .5em">
        Secure-Obscure Password Generator
      </Heading>
      <Control />
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Division
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <HDT />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Inclusion
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Inclusion />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Leetrules
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Leetrules />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Miscellaneous
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Miscellaneous />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default App;
