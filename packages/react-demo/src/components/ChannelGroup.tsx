import React from "react";
import { Box } from '@chakra-ui/react';

interface Props {
    name: string;
}

const ChannelGroup: React.FC<React.PropsWithChildren<Props>> = ({name, children}) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="8px"
            border="1px solid white"
            padding="4px"
            width="fit-content"
            borderRadius="4px"
        >
            <label style={{flex: "0"}}>{name}</label>
            <Box
                flex="1"
                display="flex"
                gap="8px"
            >
                {children}
            </Box>
        </Box>
    );
};

export default ChannelGroup;
