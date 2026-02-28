import { useState } from 'react';
import Card from '@mui/material/Card';
import { Handle, Position } from '@xyflow/react';
import InputSelectField from './InputSelectField';
import InputTextField from './InputTextField';
import BooleanInputField from './BooleanInputField';
import DateInputField from './DateInputField';
import EnumInputField from './EnumInputField';

const LANGUAGE_OPTIONS = [
  { value: 'eng', label: 'English' },
  { value: 'spa', label: 'Spanish' },
  { value: 'fra', label: 'French' },
  { value: 'deu', label: 'German' },
  { value: 'zho', label: 'Chinese' },
  { value: 'ara', label: 'Arabic' },
  { value: 'por', label: 'Portuguese' },
  { value: 'jpn', label: 'Japanese' }
];

const FIELD_OPTIONS = [
  { value: 'name', label: 'Name', type: 'text', icon: 'text' },
  { value: 'surname', label: 'Surname', type: 'text', icon: 'text' },
  { value: 'location', label: 'Location', type: 'text', icon: 'location' },
  { value: 'opted_in', label: 'Opted In', type: 'boolean', icon: 'boolean' },
  { value: 'language', label: 'Language', type: 'enum', icon: 'language', options: LANGUAGE_OPTIONS },
  { value: 'birthday', label: 'Birthday', type: 'date', icon: 'date' },
  { value: 'is_blocked', label: 'Is Blocked', type: 'boolean', icon: 'boolean' },
  { value: 'my_private_field', label: 'my private field', type: 'text', icon: 'text' },
  { value: 'my_non_private_field', label: 'my non private field', type: 'text', icon: 'text' },
  { value: 'my_super_crazy_very_extremely_private_field', label: 'my super crazy very extremely private field', type: 'text', icon: 'text' }
];

export default function CardForm() {
  const [selectedField, setSelectedField] = useState('name');
  const selectedOption = FIELD_OPTIONS.find((opt) => opt.value === selectedField);

  return (
    <div style={{ width: 280 }}>
      <Handle type="target" position={Position.Top} />

      <Card sx={{ p: 2 }}>
        <h6>Update Profile Field</h6>

        <div className="nodrag">
          <InputSelectField
            value={selectedField}
            onChange={(v) => setSelectedField(v)}
            options={FIELD_OPTIONS}
          />
          {selectedOption?.type === 'text' && (
            <InputTextField label={selectedOption.label} />
          )}
          {selectedOption?.type === 'boolean' && (
            <BooleanInputField label={selectedOption.label} embedded />
          )}
          {selectedOption?.type === 'date' && (
            <DateInputField label={selectedOption.label} embedded />
          )}
          {selectedOption?.type === 'enum' && (
            <EnumInputField
              label={selectedOption.label}
              options={selectedOption.options || []}
              embedded
            />
          )}
        </div>
      </Card>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}