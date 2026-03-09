import { DISPLAY_MODE, dateField, fileAttachment } from '../templates/fields.js';

export const circularesCollection = {
  name: 'circulares',
  label: 'Circulares',
  label_singular: 'Circular',
  icon: 'description',
  folder: 'src/content/circulares',
  create: true,
  slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
  extension: 'md',
  fields: [
    { name: 'title', label: 'Titulo', widget: 'string' },
    { name: 'numero', label: 'Numero de circular', widget: 'string' },
    dateField('date', 'Fecha de expedicion'),
    {
      name: 'dependencia',
      label: 'Dependencia emisora',
      widget: 'select',
      options: [
        'Despacho del Inspector General',
        'Secretaria General',
        'Subdireccion de Inspeccion',
        'Subdireccion Administrativa y Financiera',
        'Oficina Asesora Juridica',
        'Oficina Asesora de Planeacion',
        'Oficina de Control Interno',
        'Oficina de Tecnologias de la Informacion',
      ],
    },
    fileAttachment('archivo_pdf', 'Archivo PDF'),
    { name: 'excerpt', label: 'Resumen', widget: 'text' },
    DISPLAY_MODE,
    { name: 'body', label: 'Contenido', widget: 'markdown' },
  ],
};
