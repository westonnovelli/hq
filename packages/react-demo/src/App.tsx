import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Starships from "./components/Starships";
import colors from "./util/colors";

const DemoApp: React.FC = () => {
  return (
    <ChakraProvider>
      <Box color={colors.color5}>Coming soon</Box>
      {/* <Starships /> */}
    </ChakraProvider>
  );
};

export default DemoApp;
