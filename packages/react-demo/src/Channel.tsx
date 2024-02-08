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
    Tooltip,
    Editable,
    EditablePreview,
    EditableInput
} from "@chakra-ui/react";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { ID } from './types';

interface Props {
    id: ID;
    label: string;
    type: 'Physical' | 'Virtual';
    initiallyMuted?: boolean;
    updateName: (name: string) => void;
    toggleType: () => void;
}

const Channel: React.FC<React.PropsWithChildren<Props>> = ({
    id,
    label,
    type,
    initiallyMuted = false,
    updateName = () => {},
    toggleType = () => {},
    children
}) => {
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
              <Tooltip hasArrow label={id} bg="black" color="white" placement="top">
                <Editable defaultValue={label} onSubmit={(e) => void updateName(e)} height="40px">
                  <EditablePreview width="80px" whiteSpace="nowrap" overflowX="hidden"/>
                  <EditableInput width="80px"/>
                </Editable>
              </Tooltip>
              <Button variant="ghost" size="xs" color="lightgrey" onClick={() => void toggleType()}>{type}</Button>
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

