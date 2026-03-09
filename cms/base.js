/** Backend configuration for Sveltia CMS */
export const backend = {
  name: 'github',
  repo: 'cdavidbm/intranet-itrc',
  branch: 'main',
  base_url: 'https://sveltia-cms-auth.cdavidbm.workers.dev',
};

export const mediaFolder = 'public/uploads';
export const publicFolder = '/uploads';
export const siteUrl = 'https://cdavidbm.github.io/intranet-itrc';

export const slug = {
  encoding: 'ascii',
  clean_accents: true,
  sanitize_replacement: '-',
};
