import React from "react";
import Layout from "./Layout";
import { Box, Text, Highlight } from "@chakra-ui/react";
import Stats from "./components/Stats";

const text =
  "After a smooth runtime from August 2024 to April 2025, the CMS has officially retired.";

  const Retirement: React.FC = () => {
    return (
      <Layout marginTopVStack={7}>
        <Box width="100%">
          <Text>
            <Highlight
              query={text}
              styles={{
                px: "2",
                py: "2.4",
                bgGradient: "linear(to-r, purple.500, pink.500)",
                color: "white",
                borderRadius: "md",
                whiteSpace: "normal",
                boxDecorationBreak: "clone", // Restart background on each line fragment
                WebkitBoxDecorationBreak: "clone", // For WebKit browsers
              }}
            >
              {text}
            </Highlight>
          </Text>
          <Text>This was a fun project, thanks to all users &lt;3</Text>
          <Text>Below are some fun stats from all the data gathered.</Text>
        </Box>
  
        <Stats />
      </Layout>
    );
  };
  

export default Retirement;
