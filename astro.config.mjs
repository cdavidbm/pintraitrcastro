// @ts-check
import { defineConfig } from 'astro/config';

const isProduction = process.env.NODE_ENV === 'production';
const githubRepo = 'intranet-itrc';

export default defineConfig({
  site: isProduction ? 'https://cdavidbm.github.io' : 'http://localhost:4321',
  base: isProduction ? `/${githubRepo}/` : '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: { assets: 'assets' },
  vite: { css: { devSourcemap: true } }
});
