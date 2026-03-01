import { useRef } from 'react';
import { ClearButton } from '../atoms';
import TiptapValueField from './TiptapValueField';
import DatePickerButton from './DatePickerButton';
import BooleanPickerButton from './BooleanPickerButton';
import EnumPickerButton from './EnumPickerButton';

function formatDisplayValue(fieldType, value, fieldOptions) {
  if (value == null || value === '') return '';
  switch (fieldType) {
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'enum':
      const opt = (fieldOptions || []).find((o) => o.value === value);
      return opt ? (opt.label ?? opt.value) : String(value);
    default:
      return String(value);
  }
}

export default function ValueFieldWithPicker({
  label = 'Value',
  fieldType = 'text',
  fieldOptions = [],
  value,
  onValueChange,
  editable,
  disabled = false
}) {
  const valueContainerRef = useRef(null);
  const hasPickerValue = ['date', 'boolean', 'enum'].includes(fieldType) && value != null && value !== '';
  const displayValue = formatDisplayValue(fieldType, value, fieldOptions);

  if (fieldType === 'text') {
    return (
      <div style={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
        <TiptapValueField label={label} editable={editable} />
      </div>
    );
  }

  return (
    <div
      style={{
        width: 248,
        padding: '8px 8px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 4,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto'
      }}
      className="nodrag"
    >
      <label style={{ fontSize: '0.8rem', minWidth: 40, flexShrink: 0, paddingTop: 8 }}>{label}</label>
      <div
        ref={valueContainerRef}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          minHeight: 40,
          borderRadius: 12,
          border: '1px solid rgba(0, 0, 0, 0.23)',
          backgroundColor: hasPickerValue ? 'rgba(0, 0, 0, 0.04)' : disabled ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
          padding: '0 8px 0 12px',
          overflow: 'hidden'
        }}
      >
        {hasPickerValue ? (
          <>
            <span style={{ flex: 1, fontSize: '0.8rem', color: '#333' }}>{displayValue}</span>
            <div style={{ marginLeft: 8, flexShrink: 0 }}>
            <ClearButton onClick={() => onValueChange?.(null)} />
            </div>
          </>
        ) : (
          <>
            <div style={{ flex: 1, minWidth: 100, display: 'flex' }}>
              <TiptapValueField embedded editable={editable} />
            </div>
            <div style={{ marginLeft: 8, flexShrink: 0 }}>
              {fieldType === 'date' && <DatePickerButton containerRef={valueContainerRef} onSelect={(v) => onValueChange?.(v)} />}
              {fieldType === 'boolean' && <BooleanPickerButton containerRef={valueContainerRef} onSelect={(v) => onValueChange?.(v)} />}
              {fieldType === 'enum' && (
                <EnumPickerButton containerRef={valueContainerRef} options={fieldOptions} onSelect={(v) => onValueChange?.(v)} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
