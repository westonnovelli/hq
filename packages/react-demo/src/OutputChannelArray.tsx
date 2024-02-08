import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { OutputChannel } from './types';

interface Props {
    name: string;
    initialState?: boolean;
}

const ChannelToggle: React.FC<Props> = ({ name, initialState = true }) => {
    const [active, setActive] = React.useState(initialState);
    return (
        <Button
            size="sm"
            onClick={() => void setActive((prev) => !prev)}
            variant={active ? 'outline' : 'ghost'}
            borderColor={active ? 'lime' : 'transparent'}
            color={active ? 'white' : 'gray'}
        >{name}</Button>
    );
};

interface StaticArrayProps {
    initialConfig: number[];
}

export const StaticOutputChannelArray: React.FC<StaticArrayProps> = ({ initialConfig }) => {
    return (
        <Box display="flex" flexDirection="column">
            <ChannelToggle name="OC1" initialState={initialConfig.includes(1)}/>
            <ChannelToggle name="OC2" initialState={initialConfig.includes(2)}/>
            <ChannelToggle name="OC3" initialState={initialConfig.includes(3)}/>
            <ChannelToggle name="OC4" initialState={initialConfig.includes(4)}/>
        </Box>
    );
};


interface ArrayProps {
    routing: { channel: OutputChannel, routed: boolean }[]
}

const OutputChannelArray: React.FC<ArrayProps> = ({ routing }) => {
    return (
         <Box display="flex" flexDirection="column">
            {routing.map(({ channel, routed }) => (
                <ChannelToggle key={channel.id} name={`O${channel.id}`} initialState={routed}/>
            ))}
        </Box>
    );
};

export default OutputChannelArray;
