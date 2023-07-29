import path from 'path';

export default {
    target: 'web',
    entry: {
        main: './src/index.ts',
    },
    output: {
        filename: 'main.js',
        path: path.resolve('dist'),
        library: {
            type: 'module'
        },
    },
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                type: 'tsx',
            },
        ],
    },
};
