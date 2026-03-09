import { DISPLAY_MODE } from '../templates/fields.js';

export const directorioCollection = {
  name: 'directorio',
  label: 'Directorio de Funcionarios',
  label_singular: 'Dependencia',
  icon: 'people',
  folder: 'src/content/pages/directorio',
  create: true,
  slug: '{{slug}}',
  extension: 'json',
  fields: [
    { name: 'title', label: 'Nombre de la dependencia', widget: 'string' },
    { name: 'order', label: 'Orden', widget: 'number', default: 0 },
    {
      name: 'funcionarios',
      label: 'Funcionarios',
      widget: 'list',
      fields: [
        { name: 'nombre', label: 'Nombre completo', widget: 'string' },
        { name: 'cargo', label: 'Cargo', widget: 'string' },
        { name: 'email', label: 'Correo electronico', widget: 'string' },
        { name: 'extension', label: 'Extension telefonica', widget: 'string', required: false },
        { name: 'foto', label: 'Foto', widget: 'image', required: false },
      ],
    },
    DISPLAY_MODE,
  ],
};
