import React from 'react';
import { newMonitor, newSource, newOutput } from './factories';
import { Monitor } from './types';

interface State {
    monitor: Monitor;
}

type Action =
    | { type: 'ADD_SOURCE' }
    | { type: 'ADD_OUTPUT' }
    | { type: '' }

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
        default:
            return state;
    }
};

export default reducer;

