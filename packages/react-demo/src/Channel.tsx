import React from "react";
import {
    Text,
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    IconButton,
    Button,
} from "@chakra-ui/react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";

interface Props {
    label: string;
    type: 'Physical' | 'Virtual';
    initiallyMuted?: boolean;
}

const Channel: React.FC<React.PropsWithChildren<Props>> = ({ label, type, initiallyMuted = false, children }) => {
    const [muted, setMuted] = React.useState(initiallyMuted);
    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="4px"
            minWidth="40px"
            alignItems="center"
        >
            <Box textAlign="center">
              <Text>{label}</Text>
              <Text fontSize="xs" color="lightgrey">{type}</Text>
            </Box>
            <Box display="flex">
            <Slider
                orientation='vertical'
                aria-label={`channel-slider-${label}`}
                defaultValue={60}
                width="50px"
                minHeight="80px"
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={4} borderRadius={2}>
                    <Box color="black">-</Box>
                </SliderThumb>
            </Slider>
            {children}
            </Box>
            <Box display="flex" gap="2px">
                <Box display="flex" flexDirection="column">
                    <IconButton
                        aria-label="mute"
                        variant="outline" 
                        size="sm"
                        icon={muted ? <HiOutlineSpeakerXMark color="red"/> : <HiOutlineSpeakerWave/>}
                        onClick={() => void setMuted(prev => !prev)}
                        borderColor={muted ? 'red' : 'lime'}
                    />
                    <Button variant="outline" size="sm">Solo</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Channel;

