import React from 'react';
import { Box, Button } from '@chakra-ui/react';

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

interface ArrayProps {
    initialConfig: number[];
}

const OutputChannelArray: React.FC<ArrayProps> = ({ initialConfig }) => {
    return (
        <Box display="flex" flexDirection="column">
            <ChannelToggle name="OC1" initialState={initialConfig.includes(1)}/>
            <ChannelToggle name="OC2" initialState={initialConfig.includes(2)}/>
            <ChannelToggle name="OC3" initialState={initialConfig.includes(3)}/>
            <ChannelToggle name="OC4" initialState={initialConfig.includes(4)}/>
        </Box>
    );
};

export default OutputChannelArray;
