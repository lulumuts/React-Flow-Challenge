import { useRef, useState } from 'react';
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
  optionsLoader,
  value,
  onValueChange,
  editable,
  disabled = false
}) {
  const valueContainerRef = useRef(null);
  const [loadedOptions, setLoadedOptions] = useState([]);
  const [savedOutput, setSavedOutput] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const resolvedOptions = optionsLoader ? loadedOptions : fieldOptions;
  const hasPickerValue = ['date', 'boolean', 'enum'].includes(fieldType) && value != null && value !== '';
  const displayValue = formatDisplayValue(fieldType, value, resolvedOptions);
  const showSubmitForPicker = hasPickerValue && (fieldType === 'boolean' || fieldType === 'date' || fieldType === 'enum');

  const handlePickerSubmit = () => {
    if (hasPickerValue) {
      setSavedOutput(displayValue);
      onValueChange?.(null);
    }
  };

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
        width: 360,
        padding: '6px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto'
      }}
      className="nodrag"
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4 }}>
        <label style={{ fontSize: '0.8rem', minWidth: 40, flexShrink: 0, paddingTop: 8, opacity: 0.7 }}>{label}</label>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 6
          }}
        >
          <div
            ref={valueContainerRef}
            className="value-field"
            style={{
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
                  {fieldType === 'boolean' && (
                    <BooleanPickerButton
                      containerRef={valueContainerRef}
                      value={value}
                      onSelect={(v) => onValueChange?.(v)}
                    />
                  )}
                  {fieldType === 'enum' && (
                    <EnumPickerButton
                      containerRef={valueContainerRef}
                      options={resolvedOptions}
                      optionsLoader={optionsLoader}
                      onOptionsLoaded={setLoadedOptions}
                      value={value}
                      onSelect={(v) => onValueChange?.(v)}
                    />
                  )}
                </div>
              </>
            )}
          </div>
          {showSubmitForPicker && (
            <button
              type="button"
              onClick={handlePickerSubmit}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              style={{
                width: '100%',
                marginTop: 16,
                padding: '10px 16px',
                fontSize: '0.8rem',
                fontWeight: 500,
                color: isButtonHovered ? '#fff' : '#8350cb',
                backgroundColor: isButtonHovered ? '#8350cb' : 'transparent',
                border: '1px solid #8350cb',
                borderRadius: 12,
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
      {savedOutput != null && savedOutput !== '' && (
        <div
          style={{
            padding: 10,
            fontSize: '0.8rem',
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderRadius: 8,
            color: '#333',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        >
          <div style={{ fontSize: '0.7rem', opacity: 0.7, marginBottom: 4 }}>Output</div>
          {savedOutput}
        </div>
      )}
    </div>
  );
}
