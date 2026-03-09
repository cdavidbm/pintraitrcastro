import { DISPLAY_MODE, dateField } from '../templates/fields.js';

export const eventosCollection = {
  name: 'eventos',
  label: 'Eventos',
  label_singular: 'Evento',
  icon: 'event',
  folder: 'src/content/eventos',
  create: true,
  slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
  extension: 'json',
  fields: [
    { name: 'title', label: 'Titulo', widget: 'string' },
    { name: 'description', label: 'Descripcion', widget: 'text' },
    dateField('start_date', 'Fecha de inicio'),
    dateField('end_date', 'Fecha de fin'),
    { name: 'location', label: 'Lugar', widget: 'string', required: false },
    {
      name: 'category',
      label: 'Categoria',
      widget: 'select',
      options: ['Institucional', 'Capacitacion', 'Bienestar', 'Reunion', 'Otro'],
      default: 'Institucional',
    },
    DISPLAY_MODE,
  ],
};
