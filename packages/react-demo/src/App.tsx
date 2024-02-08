import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Channel from "./Channel";
import ChannelGroup from "./components/ChannelGroup";
import colors from "./util/colors";
import { StaticOutputChannelArray } from "./OutputChannelArray";
import MonitorView from './MonitorView';

const DemoApp: React.FC = () => {
  return (
    <ChakraProvider>
      <MonitorView/>
    </ChakraProvider>
  );
};

export default DemoApp;
