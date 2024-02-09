import { Monitor, Channel, SourceChannel, OutputChannel } from './types';
import { Option } from "./type-utils";

export function newMonitor(): Monitor {
    return {
        sources: [],
        outputs: [],
        solo: Option.None(),
    };
}

export function newSource(): SourceChannel {
    return {
        ...newChannel(),
        subchanneled: 'off',
        destinations: [],
    };
}

function* infinite() {
  let index = 0;

  while (true) {
    yield index++;
  }
}
const idGenerator = infinite();
const DEFAULT_GAIN = 0;

export function newChannel(): Channel {
    return {
        id: `${idGenerator.next().value}`,
        label: 'Unnamed',
        type: 'Virtual' as const,
        simpleGain: DEFAULT_GAIN,
        feed: {
            level: 0
        },
        muted: false,
    };
}

export function newOutput(): OutputChannel {
    return {
        ...newChannel(),
        isMonitor: false,
    };
}

