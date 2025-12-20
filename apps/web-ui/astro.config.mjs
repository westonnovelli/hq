import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';
import AutoImport from 'astro-auto-import';
import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';
import mdx from '@astrojs/mdx';

export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone'
    }),
    integrations: [
        tailwind(),
        react(),
        AutoImport({
            imports: [
                mdxCodeBlockAutoImport('./src/components/CodeBlock.astro')
            ],
        }),
        MDXCodeBlocks(),
        mdx()
    ],
    site: 'https://weston.novelli.dev',
    outDir: '../../dist'
});

