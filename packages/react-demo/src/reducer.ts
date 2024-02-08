import React from 'react';
import { newMonitor, newSource, newOutput } from './factories';
import { ID, Monitor, Channel} from './types';

interface State {
    monitor: Monitor;
}

type Action =
    | { type: 'ADD_SOURCE' }
    | { type: 'ADD_OUTPUT' }
    | { type: 'RENAME_CHANNEL', payload: { channelId: ID, newName: string; }}
    | { type: 'TOGGLE_TYPE', payload: { channelId: ID }}
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

export const initialState: State = {
    monitor: newMonitor()
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
        default:
            return state;
    }
};

export default reducer;

