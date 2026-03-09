import { DISPLAY_MODE, dateField } from '../templates/fields.js';

export const anunciosCollection = {
  name: 'anuncios',
  label: 'Anuncios',
  label_singular: 'Anuncio',
  icon: 'announcement',
  folder: 'src/content/anuncios',
  create: true,
  slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
  extension: 'md',
  fields: [
    { name: 'title', label: 'Titulo', widget: 'string' },
    dateField('date', 'Fecha de publicacion'),
    {
      name: 'category',
      label: 'Categoria',
      widget: 'select',
      options: [
        'General',
        'Institucional',
        'Talento Humano',
        'Tecnologia',
        'Bienestar',
      ],
      default: 'General',
    },
    {
      name: 'featured',
      label: 'Destacado',
      widget: 'boolean',
      default: false,
    },
    {
      name: 'image',
      label: 'Imagen',
      widget: 'image',
      required: false,
    },
    { name: 'excerpt', label: 'Resumen', widget: 'text' },
    DISPLAY_MODE,
    { name: 'body', label: 'Contenido', widget: 'markdown' },
  ],
};
