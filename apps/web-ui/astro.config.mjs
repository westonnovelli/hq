import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [tailwind(), react(), mdx()],
  site: 'https://weston.novelli.dev',
  outDir: '../../dist',
});

