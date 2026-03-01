import { useState } from 'react';
import Card from '@mui/material/Card';
import { Handle, Position } from '@xyflow/react';
import InputSelectField from '../molecules/InputSelectField';
import ValueFieldWithPicker from '../molecules/ValueFieldWithPicker';
import { LANGUAGE_OPTIONS } from '../../lib/languageOptions';

const EMPTY_OPTION = { value: '', label: 'Select a field...' };

const STATUS_OPTIONS = [
  { value: 'opt_a', label: 'Option A' },
  { value: 'opt_b', label: 'Option B' },
  { value: 'opt_c', label: 'Option C' }
];

const FIELD_OPTIONS = [
  { value: 'name', label: 'Name', type: 'text', icon: 'text' },
  { value: 'surname', label: 'Surname', type: 'text', icon: 'text' },
  { value: 'location', label: 'Location', type: 'text', icon: 'location' },
  { value: 'opted_in', label: 'Opted In', type: 'boolean', icon: 'boolean' },
  { value: 'language', label: 'Language', type: 'enum', icon: 'language', options: LANGUAGE_OPTIONS },
  { value: 'status', label: 'Status', type: 'enum', icon: 'enum', options: STATUS_OPTIONS },
  { value: 'birthday', label: 'Birthday', type: 'date', icon: 'date' },
  { value: 'is_blocked', label: 'Is Blocked', type: 'boolean', icon: 'boolean' },
  { value: 'my_private_field', label: 'my private field', type: 'text', icon: 'text' },
  { value: 'my_non_private_field', label: 'my non private field', type: 'text', icon: 'text' },
  { value: 'my_super_crazy_very_extremely_private_field', label: 'my super crazy very extremely private field', type: 'text', icon: 'text' }
];

export default function CardForm() {
  const [selectedField, setSelectedField] = useState('');
  const [value, setValue] = useState(null);
  const selectedOption = FIELD_OPTIONS.find((opt) => opt.value === selectedField);
  const hasFieldSelected = selectedField !== '';
  const selectOptions = [EMPTY_OPTION, ...FIELD_OPTIONS];

  const fieldType = selectedOption?.type ?? 'text';
  const fieldOptions = selectedOption?.options ?? [];
  const hasPickerValue = ['date', 'boolean', 'enum'].includes(fieldType) && value != null && value !== '';
  const editable = fieldType === 'text' || !hasPickerValue;

  const handleFieldChange = (nextField) => {
    setSelectedField(nextField);
    setValue(null);
  };

  return (
    <div style={{ width: 296 }}>
      <Handle type="target" position={Position.Top} />

      <Card sx={{ p: 2 }}>
        <h6>Update Profile Field</h6>

        <div className="nodrag">
          <InputSelectField
            value={selectedField}
            onChange={handleFieldChange}
            options={selectOptions}
          />
          <ValueFieldWithPicker
            label="Value"
            fieldType={fieldType}
            fieldOptions={fieldOptions}
            value={value}
            onValueChange={setValue}
            editable={hasFieldSelected && editable}
            disabled={!hasFieldSelected}
          />
        </div>
      </Card>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}