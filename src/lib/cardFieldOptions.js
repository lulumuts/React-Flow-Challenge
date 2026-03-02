import { fetchLanguageOptions } from './languageOptions';

export const EMPTY_OPTION = { value: '', label: 'Select a field...' };

export const FIELD_OPTIONS = [
  { value: 'name', label: 'Name', type: 'text', icon: 'text' },
  { value: 'surname', label: 'Surname', type: 'text', icon: 'text' },
  { value: 'location', label: 'Location', type: 'text', icon: 'location' },
  { value: 'opted_in', label: 'Opted In', type: 'boolean', icon: 'boolean' },
  { value: 'language', label: 'Language', type: 'enum', icon: 'language', optionsLoader: fetchLanguageOptions },
  { value: 'birthday', label: 'Birthday', type: 'date', icon: 'date' },
  { value: 'is_blocked', label: 'Is Blocked', type: 'boolean', icon: 'boolean' },
  { value: 'my_private_field', label: 'my private field', type: 'text', icon: 'text' },
  { value: 'my_non_private_field', label: 'my non private field', type: 'text', icon: 'text' },
  { value: 'my_super_crazy_very_extremely_private_field', label: 'my super crazy very extremely private field', type: 'text', icon: 'text' }
];
