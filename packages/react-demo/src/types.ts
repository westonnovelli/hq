import { Option } from './type-utils';

type ID = string;

export interface Channel {
    id: ID;
    label: string;
    type: 'Physical' | 'Virtual';
    simpleGain: number;
    feed: Feed;
    muted: boolean;
}

export interface Feed {
    level: number;
}

export interface SourceChannel extends Channel {
    destinations: Routing[];
}

export interface Routing {
    destination: OutputChannel;
    gain: number;
}

export interface OutputChannel extends Channel {
    // what goes here?
    // maybe the device? 
    isMonitor: boolean; // maybe?
}

export interface Monitor {
    sources: SourceChannel[];
    outputs: OutputChannel[];
    solo: Option<Channel>;
}

