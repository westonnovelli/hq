import { defineConfig, envField } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import AutoImport from 'astro-auto-import';
import MDXCodeBlocks, { mdxCodeBlockAutoImport } from 'astro-mdx-code-blocks';
import mdx from '@astrojs/mdx';

export default defineConfig({
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
    outDir: '../../dist',
    env: {
        PUBLIC_POSTHOG_KEY: envField.string({ context: "client", access: "public", optional: true }),
    }
});

