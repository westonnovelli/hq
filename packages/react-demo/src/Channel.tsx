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
import { IoIosMore } from "react-icons/io";
import { ID, SourceChannel } from './types';

interface Props {
    id: ID;
    label: string;
    type: 'Physical' | 'Virtual';
    initiallyMuted?: boolean;
    subchanneled?: SourceChannel['subchanneled'];
    updateName: (name: string) => void;
    toggleType: () => void;
    remove: () => void;
    setSubchannel?: () => void;
}

const Channel: React.FC<React.PropsWithChildren<Props>> = ({
    id,
    label,
    type,
    initiallyMuted = false,
    subchanneled,
    updateName,
    toggleType,
    remove,
    setSubchannel = () => {},
    children
}) => {
    const [muted, setMuted] = React.useState(initiallyMuted);
    const [mode, setMode] = React.useState<'normal' | 'settings'>('normal');

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap="4px"
            width="100px"
            alignItems="center"
        >
        {mode === 'normal' && (
        <>
            <Box textAlign="center">
              <Tooltip hasArrow label={id} bg="black" color="white" placement="top">
                <Editable defaultValue={label} onSubmit={(e) => void updateName(e)} height="40px">
                  <EditablePreview width="80px" whiteSpace="nowrap" overflowX="hidden"/>
                  <EditableInput width="80px"/>
                </Editable>
              </Tooltip>
              <Button variant="ghost" size="xs" color="lightgrey" onClick={() => void toggleType()}>{type}</Button>
            </Box>
            <Box display="flex" height="160px">
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
                <Box display="flex" flexDirection="column" gap="2px" width="52px">
                    <IconButton
                        aria-label="mute"
                        variant="outline" 
                        size="sm"
                        icon={muted ? <HiOutlineSpeakerXMark color="red"/> : <HiOutlineSpeakerWave/>}
                        onClick={() => void setMuted(prev => !prev)}
                        borderColor={muted ? 'red' : 'lime'}
                    />
                    {/*<Button variant="outline" size="sm">Solo</Button>*/}
                    <IconButton
                      icon={<IoIosMore/>}
                      aria-label="more"
                      size="sm"
                      maxHeight="24px"
                      onClick={() => void setMode('settings')}
                    />
                </Box>
                </>
            )}
            {mode === 'settings' && (
                <Box display="flex" flexDirection="column" gap="4px" width="100%">
                    <Button onClick={() => void setMode('normal')} size="sm">Back</Button>
                    <Button onClick={remove} size="sm" variant="outline" borderColor="red">Remove</Button>
                    {subchanneled && (
                        <Box width="100%" display="flex" flexDirection="column">
                            <Text fontSize="xs">Subchanneling</Text>
                            <Button
                                onClick={setSubchannel}
                                size="sm"
                                variant="outline"
                                textTransform="capitalize"
                                borderColor={subchanneled !== 'off' ? 'lime' : 'default'}
                            >{subchanneled}</Button>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Channel;

