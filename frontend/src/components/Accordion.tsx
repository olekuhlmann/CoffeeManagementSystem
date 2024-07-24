import React from 'react';
import {
  Accordion as ChakraAccordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

interface AccordionItemProps {
  label: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <ChakraAccordion allowMultiple={false} allowToggle width={"100%"}>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" width="100%">
                {item.label}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {item.content}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </ChakraAccordion>
  );
};

export default Accordion;
