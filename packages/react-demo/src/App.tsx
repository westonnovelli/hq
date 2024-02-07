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
      <Box height="80vh" overflowX="auto" width="100%">
        <Box display="flex" flexDirection="column" gap="16px" height="100%">
          <ChannelGroup name="Sources">
            <Channel label="Mic" type="Physical">
                <StaticOutputChannelArray initialConfig={[2, 3, 4]}/>
            </Channel>
            <Channel label="Game" type="Virtual" >
                <StaticOutputChannelArray initialConfig={[1, 2, 3]}/>
            </Channel>
            <Channel label="System" type="Virtual" >
                <StaticOutputChannelArray initialConfig={[1, 2]}/>
            </Channel>
            <Channel label="Music" type="Virtual" >
                <StaticOutputChannelArray initialConfig={[1, 2, 3]}/>
            </Channel>
            <Channel label="Comms In" type="Virtual" >
                <StaticOutputChannelArray initialConfig={[2]}/>
            </Channel>
          </ChannelGroup>
          <ChannelGroup name="Outputs">
            <Channel label="Speakers" type="Physical" initiallyMuted={true}/>
            <Channel label="Headset" type="Physical"/>
            <Channel label="Stream" type="Virtual"/>
            <Channel label="Comms Out" type="Virtual"/>
          </ChannelGroup>
        </Box>
      </Box>
      <MonitorView/>
    </ChakraProvider>
  );
};

export default DemoApp;
