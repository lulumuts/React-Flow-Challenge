import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import { UserIcon, InfoCircleIcon } from '../atoms/ProfileHeaderIcons';
import { Handle, Position } from '@xyflow/react';
import InputSelectField from '../molecules/InputSelectField';
import ValueFieldWithPicker from '../molecules/ValueFieldWithPicker';
import { fetchLanguageOptions } from '../../lib/languageOptions';

const EMPTY_OPTION = { value: '', label: 'Select a field...' };

const FIELD_OPTIONS = [
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

export default function CardForm() {
  const [selectedField, setSelectedField] = useState('');
  const [value, setValue] = useState(null);
  const selectedOption = FIELD_OPTIONS.find((opt) => opt.value === selectedField);
  const hasFieldSelected = selectedField !== '';
  const selectOptions = [EMPTY_OPTION, ...FIELD_OPTIONS];

  const fieldType = selectedOption?.type ?? 'text';
  const fieldOptions = selectedOption?.options ?? [];
  const optionsLoader = selectedOption?.optionsLoader;
  const hasPickerValue = ['date', 'boolean', 'enum'].includes(fieldType) && value != null && value !== '';
  const editable = fieldType === 'text' || !hasPickerValue;

  const handleFieldChange = (nextField) => {
    setSelectedField(nextField);
    setValue(null);
  };

  return (
    <div style={{ width: 400 }}>
      <Handle type="target" position={Position.Top} />

      <Card
        sx={{
          p: 0,
          overflow: 'hidden',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          border: '2px solid #8350cb',
          boxShadow: 'none'
        }}
      >
        <div
          className="card-drag-handle"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            width: '100%',
            minHeight: 36,
            boxSizing: 'border-box',
            padding: 8,
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderRadius: '16px 16px 0 0'
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              backgroundColor: '#F4B3FF',
              borderRadius: 6,
              color: 'rgba(0, 0, 0, 0.6)'
            }}
          >
            <UserIcon size={18} />
          </span>
          <h6 style={{ margin: 0, flex: 1, fontSize: '0.8rem', fontWeight: 400 }}>Update Profile Field</h6>
          <IconButton
            size="small"
            aria-label="More info"
            disableFocusRipple
            sx={{
              p: 0,
              minWidth: 28,
              minHeight: 28,
              color: 'rgba(0, 0, 0, 0.6)',
              '&:hover': { color: 'rgba(0, 0, 0, 0.87)', backgroundColor: 'rgba(0, 0, 0, 0.04)' },
              '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' }
            }}
          >
            <InfoCircleIcon size={20} />
          </IconButton>
        </div>

        <div className="nodrag" style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 9px' }}>
          <InputSelectField
            value={selectedField}
            onChange={handleFieldChange}
            options={selectOptions}
          />
          <ValueFieldWithPicker
            label="Value"
            fieldType={fieldType}
            fieldOptions={fieldOptions}
            optionsLoader={optionsLoader}
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