import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import reducer, { initialState }  from './reducer';
import ChannelGroup from './components/ChannelGroup';
import Channel from './Channel';
import OutputChannelArray from './OutputChannelArray';

const MonitorView: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
    <Box>
        <Box>
            <ChannelGroup name="Sources">
                {state.monitor.sources.map((source) => {
                    const routing = state.monitor.outputs.map((channel) => ({
                        channel,
                        routed: Boolean(source.destinations.find(({ destination }) => {
                            return destination.id === channel.id;
                        }))
                    }));
                    return (
                        <Channel
                            key={source.id}
                            label={source.label}
                            type={source.type}
                        >
                            {routing.length > 0 && (
                                <OutputChannelArray routing={routing} />
                            )}
                        </Channel>
                    );
                })}
                <Button onClick={() => void dispatch({ type: 'ADD_SOURCE' })}>+</Button>
            </ChannelGroup>
        </Box>
        <Box>
            <ChannelGroup name="Outputs">
                {state.monitor.outputs.map((output) => {
                    return (
                        <Channel
                            key={output.id}
                            label={output.label}
                            type={output.type}
                        />
                    );
                })}
                <Button onClick={() => void dispatch({ type: 'ADD_OUTPUT' })}>+</Button>
            </ChannelGroup>
        </Box>
      </Box>
    );
};


export default MonitorView;

