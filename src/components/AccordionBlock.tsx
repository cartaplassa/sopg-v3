import {
  Box,
  Heading,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { type ReactNode } from "react";

type AccordionBlockProps = {
  title: string;
  children: ReactNode;
};

export default function AccordionBlock({
  title,
  children,
}: AccordionBlockProps) {
  return (
    <AccordionItem>
      <Heading as="h2">
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </Heading>
      <AccordionPanel>{children}</AccordionPanel>
    </AccordionItem>
  );
}
