/**
 * Format value for display based on field type.
 */
export function formatDisplayValue(fieldType, value, fieldOptions) {
  if (value == null || value === '') return '';
  switch (fieldType) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'enum': {
      const opt = (fieldOptions || []).find((o) => o.value === value);
      return opt ? (opt.label ?? opt.value) : String(value);
    }
    default:
      return String(value);
  }
}
