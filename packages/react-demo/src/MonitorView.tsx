import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import reducer, { initialState }  from './reducer';
import ChannelGroup from './components/ChannelGroup';
import Channel from './Channel';
import OutputChannelArray from './OutputChannelArray';

const MonitorView: React.FC = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
    <Box display="flex" flexDirection="column" gap="16px">
        <Box>
            <ChannelGroup name="Sources">
                {state.monitor.sources.map((source) => {
                    const routing = state.monitor.outputs.map((channel) => ({
                        channel,
                        routed: Boolean(source.destinations.find(({ destination }) => {
                            return destination === channel.id;
                        }))
                    }));
                    return (
                        <Channel
                            key={source.id}
                            id={source.id}
                            label={source.label}
                            type={source.type}
                            initiallyMuted={source.muted}
                            updateName={(newName) => dispatch({type: 'RENAME_CHANNEL', payload: {channelId: source.id, newName }})}
                            toggleType={() => dispatch({ type: 'TOGGLE_TYPE', payload: { channelId: source.id }})}
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
                            id={output.id}
                            label={output.label}
                            type={output.type}
                            initiallyMuted={output.muted}
                            updateName={(newName) => dispatch({type: 'RENAME_CHANNEL', payload: {channelId: output.id, newName }})}
                            toggleType={() => dispatch({ type: 'TOGGLE_TYPE', payload: { channelId: output.id }})}
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

