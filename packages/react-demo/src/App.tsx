import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Starships from "./components/Starships";

const DemoApp: React.FC = () => {
  return (
    <ChakraProvider>
      <div>DemoApp</div>
      <Starships />
    </ChakraProvider>
  );
};

export default DemoApp;
