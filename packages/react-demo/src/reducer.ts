import React from 'react';
import { newSource, newOutput } from './factories';
import { ID, Monitor, Channel, SourceChannel} from './types';
import { Option } from './type-utils';

interface State {
    monitor: Monitor;
}

type Action =
    | { type: 'ADD_SOURCE' }
    | { type: 'ADD_OUTPUT' }
    | { type: 'RENAME_CHANNEL', payload: { channelId: ID, newName: string; }}
    | { type: 'TOGGLE_TYPE', payload: { channelId: ID }}
    | { type: 'REMOVE_CHANNEL', payload: { channelId: ID }}
    | { type: 'SET_SUBCHANNEL', payload: { sourceId: ID, subchanneled: SourceChannel['subchanneled'] }}
;

const rename = (payload: { channelId: ID; newName: string; }) => <T extends Channel>(channel: T) => {
    if (channel.id !== payload.channelId) return channel;

    return {
        ...channel,
        label: payload.newName,
    };
};

const toggleType = (payload: { channelId: ID }) => <T extends Channel>(channel: T) => {
    if (channel.id !== payload.channelId) return channel;

    return {
        ...channel,
        type: channel.type === 'Virtual' ? 'Physical' : 'Virtual',
    };
};

const setSource = (payload: { sourceId: ID, subchanneled: SourceChannel['subchanneled']}) => (source: SourceChannel) => {
    if (source.id !== payload.sourceId) return source;

    return {
        ...source,
        subchanneled: payload.subchanneled 
    };
};

export const initialState: State = {
    monitor: {
        sources: [{
            ...newSource(),
            id: 'source:1',
            label: 'Mic',
            type: 'Physical',
            destinations: [{
                gain: 0,
                destination: 'B'
            },{
                gain: 0,
                destination: 'C'
            },{
                gain: 0,
                destination: 'D'
            }],
        },{
            ...newSource(),
            id: 'source:2',
            label: 'System',
            type: 'Virtual',
            destinations: [{
                gain: 0,
                destination: 'A'
            },{
                gain: 0,
                destination: 'B'
            },{
                gain: 0,
                destination: 'C'
            }],
        },{
            ...newSource(),
            id: 'source:3',
            label: 'Game',
            type: 'Virtual',
            destinations: [{
                gain: 0,
                destination: 'A'
            }, {
                gain: 0,
                destination: 'B'
            }],
        },{
            ...newSource(),
            id: 'source:4',
            label: 'Music',
            type: 'Virtual',
            subchanneled: 'independent',
            destinations: [{
                gain: 0,
                destination: 'A'
            },{
                gain: 0,
                destination: 'B'
            },{
                gain: 0,
                destination: 'C'
            }],
        },{
            ...newSource(),
            id: 'source:5',
            label: 'Comms In',
            type: 'Virtual',
            destinations: [{
                gain: 0,
                destination: 'B'
            }],
        }],
        outputs: [{
            ...newOutput(),
            id: 'A',
            label: 'Speakers',
            type: 'Physical',
            muted: true,
        },{
            ...newOutput(),
            id: 'B',
            label: 'Headset',
            type: 'Physical',
        },{
            ...newOutput(),
            id: 'C',
            label: 'Stream',
            type: 'Virtual',
        },{
            ...newOutput(),
            id: 'D',
            label: 'Comms Out',
            type: 'Virtual',
        }],
        solo: Option.None(),
    }
};

const reducer: React.Reducer<State, Action> = (state, action): State => {
    switch(action.type) {
        case 'ADD_SOURCE': {
            return {
                ...state,
                monitor: {
                    ...state.monitor,
                    sources: [
                        ...state.monitor.sources,
                        newSource(),
                    ],
                }
            };
        }
        case 'ADD_OUTPUT': {
            return {
                ...state,
                monitor: {
                    ...state.monitor,
                    outputs: [
                        ...state.monitor.outputs,
                        newOutput(),
                    ],
                }
            };
        }
        case 'RENAME_CHANNEL': {
            return {
                ...state,
                monitor: {
                    ...state.monitor,
                    sources: state.monitor.sources.map(rename(action.payload)),
                    outputs: state.monitor.outputs.map(rename(action.payload)),
                }
            };
        }
        case 'TOGGLE_TYPE': {
            return {
                ...state,
                monitor: {
                    ...state.monitor,
                    sources: state.monitor.sources.map(toggleType(action.payload)),
                    outputs: state.monitor.outputs.map(toggleType(action.payload)),
                },
            };
        }
        case 'REMOVE_CHANNEL': {
            return {
                ...state,
                monitor: {
                    ...state.monitor,
                    sources: state.monitor.sources.filter(({ id }) => id !== action.payload.channelId),
                    outputs: state.monitor.outputs.filter(({ id }) => id !== action.payload.channelId),
                },
            };
        }
        case 'SET_SUBCHANNEL': {
            return {
                ...state,
                monitor: {
                    ...state.monitor,
                    sources: state.monitor.sources.map(setSource(action.payload)),
                },
            };
        }
        default:
            return state;
    }
};

export default reducer;

