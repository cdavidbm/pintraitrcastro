import { DISPLAY_MODE } from '../templates/fields.js';

export const settingsCollection = {
  name: 'settings',
  label: 'Configuracion',
  label_singular: 'Configuracion',
  icon: 'settings',
  editor: { preview: false },
  files: [
    {
      name: 'site',
      label: 'Informacion del sitio',
      file: 'src/content/settings/site.json',
      fields: [
        { name: 'name', label: 'Nombre del sitio', widget: 'string' },
        { name: 'description', label: 'Descripcion', widget: 'text' },
        { name: 'entity', label: 'Nombre de la entidad', widget: 'string' },
      ],
    },
    {
      name: 'navigation',
      label: 'Navegacion',
      file: 'src/content/settings/navigation.json',
      fields: [
        {
          name: 'items',
          label: 'Items del menu',
          widget: 'list',
          fields: [
            { name: 'label', label: 'Etiqueta', widget: 'string' },
            { name: 'href', label: 'Enlace', widget: 'string' },
            { name: 'icon', label: 'Icono (clase Font Awesome)', widget: 'string' },
            {
              name: 'children',
              label: 'Sub-items',
              widget: 'list',
              required: false,
              fields: [
                { name: 'label', label: 'Etiqueta', widget: 'string' },
                { name: 'href', label: 'Enlace', widget: 'string' },
                { name: 'icon', label: 'Icono', widget: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      label: 'Contacto interno',
      file: 'src/content/settings/contact.json',
      fields: [
        {
          name: 'helpdesk',
          label: 'Mesa de Ayuda TI',
          widget: 'object',
          fields: [
            { name: 'name', label: 'Nombre', widget: 'string' },
            { name: 'extension', label: 'Extension', widget: 'string' },
            { name: 'email', label: 'Correo', widget: 'string' },
          ],
        },
        {
          name: 'hr',
          label: 'Talento Humano',
          widget: 'object',
          fields: [
            { name: 'name', label: 'Nombre', widget: 'string' },
            { name: 'extension', label: 'Extension', widget: 'string' },
            { name: 'email', label: 'Correo', widget: 'string' },
          ],
        },
      ],
    },
    {
      name: 'quickAccess',
      label: 'Accesos rapidos',
      file: 'src/content/settings/quickAccess.json',
      fields: [
        {
          name: 'items',
          label: 'Accesos rapidos',
          widget: 'list',
          fields: [
            { name: 'label', label: 'Etiqueta', widget: 'string' },
            { name: 'icon', label: 'Icono (clase Font Awesome)', widget: 'string' },
            { name: 'url', label: 'URL', widget: 'string' },
            { name: 'color', label: 'Color (hex)', widget: 'color', required: false },
          ],
        },
      ],
    },
  ],
};
