import { DISPLAY_MODE } from '../templates/fields.js';

export const enlacesCollection = {
  name: 'enlaces',
  label: 'Herramientas y Enlaces',
  label_singular: 'Enlace',
  icon: 'link',
  folder: 'src/content/enlaces',
  create: true,
  slug: '{{slug}}',
  extension: 'json',
  fields: [
    { name: 'title', label: 'Nombre', widget: 'string' },
    { name: 'description', label: 'Descripcion', widget: 'text' },
    { name: 'url', label: 'URL', widget: 'string' },
    { name: 'icon', label: 'Icono (clase Font Awesome)', widget: 'string' },
    {
      name: 'category',
      label: 'Categoria',
      widget: 'select',
      options: [
        'Sistema de Informacion',
        'Herramienta Interna',
        'Portal Externo',
        'Correo y Comunicaciones',
      ],
    },
    { name: 'order', label: 'Orden', widget: 'number', default: 0 },
    DISPLAY_MODE,
  ],
};
