/**
 * Reusable field templates for CMS collections.
 * Shared objects generate YAML anchors when referenced by multiple collections.
 */

/** Display mode field — shared ref generates YAML anchor &display_mode / *display_mode */
export const DISPLAY_MODE = {
  name: 'display_mode',
  label: 'Modo de visualizacion',
  widget: 'select',
  options: ['visible', 'hidden', 'draft'],
  default: 'visible',
};

/** Standard page header fields */
export function pageHeader() {
  return [
    { name: 'title', label: 'Titulo', widget: 'string' },
    { name: 'description', label: 'Descripcion', widget: 'text', required: false },
    { ...DISPLAY_MODE },
  ];
}

/** Date field with sensible defaults */
export function dateField(name = 'date', label = 'Fecha') {
  return {
    name,
    label,
    widget: 'datetime',
    date_format: 'YYYY-MM-DD',
    time_format: false,
  };
}

/** File/document attachment */
export function fileAttachment(name = 'archivo', label = 'Archivo adjunto') {
  return {
    name,
    label,
    widget: 'file',
    required: false,
    media_folder: '/public/uploads/documentos',
    public_folder: '/uploads/documentos',
  };
}
