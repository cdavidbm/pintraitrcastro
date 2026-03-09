import { DISPLAY_MODE, dateField } from '../templates/fields.js';

export const capacitacionesCollection = {
  name: 'capacitaciones',
  label: 'Capacitaciones',
  label_singular: 'Capacitacion',
  icon: 'school',
  folder: 'src/content/capacitaciones',
  create: true,
  slug: '{{slug}}',
  extension: 'json',
  fields: [
    { name: 'title', label: 'Titulo', widget: 'string' },
    { name: 'description', label: 'Descripcion', widget: 'text' },
    dateField('date', 'Fecha'),
    {
      name: 'type',
      label: 'Tipo',
      widget: 'select',
      options: ['Curso', 'Taller', 'Webinar', 'Guia', 'Video'],
      default: 'Curso',
    },
    {
      name: 'modality',
      label: 'Modalidad',
      widget: 'select',
      options: ['Presencial', 'Virtual', 'Autoestudio'],
      default: 'Virtual',
    },
    { name: 'video_url', label: 'URL del video (YouTube)', widget: 'string', required: false },
    { name: 'material_url', label: 'Enlace a material', widget: 'file', required: false },
    { name: 'instructor', label: 'Instructor/Facilitador', widget: 'string', required: false },
    DISPLAY_MODE,
  ],
};
