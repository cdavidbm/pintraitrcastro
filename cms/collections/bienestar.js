import { DISPLAY_MODE, dateField } from '../templates/fields.js';

export const bienestarCollection = {
  name: 'bienestar',
  label: 'Bienestar Laboral',
  label_singular: 'Actividad',
  icon: 'favorite',
  folder: 'src/content/pages/bienestar',
  create: true,
  slug: '{{slug}}',
  extension: 'json',
  fields: [
    { name: 'title', label: 'Titulo', widget: 'string' },
    { name: 'description', label: 'Descripcion', widget: 'text' },
    {
      name: 'category',
      label: 'Categoria',
      widget: 'select',
      options: ['Actividad', 'Beneficio', 'Salud Ocupacional', 'Recreacion'],
    },
    dateField('date', 'Fecha'),
    { name: 'image', label: 'Imagen', widget: 'image', required: false },
    { name: 'contact', label: 'Contacto', widget: 'string', required: false },
    DISPLAY_MODE,
  ],
};
