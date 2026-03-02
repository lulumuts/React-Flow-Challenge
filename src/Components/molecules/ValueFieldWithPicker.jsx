import { ClearButton } from '../atoms';
import TiptapValueField from './TiptapValueField';
import DatePickerButton from './DatePickerButton';
import BooleanPickerButton from './BooleanPickerButton';
import EnumPickerButton from './EnumPickerButton';
import { useValueFieldWithPicker } from '../../hooks/useValueFieldWithPicker';

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
  const {
    valueContainerRef,
    setLoadedOptions,
    resolvedOptions,
    hasPickerValue,
    displayValue,
    fieldModifier,
    savedOutput,
    handlePickerSubmit,
    handleClear
  } = useValueFieldWithPicker({ fieldType, fieldOptions, optionsLoader, value, onValueChange, disabled });

  if (fieldType === 'text') {
    return (
      <div className={`nodrag ${disabled ? 'value-field-with-picker--disabled' : ''}`}>
        <TiptapValueField label={label} editable={editable} />
      </div>
    );
  }

  const pickerProps = { containerRef: valueContainerRef, onSelect: (v) => onValueChange?.(v) };

  return (
    <div className={`value-field-with-picker nodrag ${disabled ? 'value-field-with-picker--disabled' : ''}`}>
      <div className="value-field-with-picker__content">
        <div className="value-field-with-picker__row">
          <label className="value-field-with-picker__label">{label}</label>
          <div
            ref={valueContainerRef}
            className={`value-field-with-picker__field value-field-with-picker__field--${fieldModifier}`}
          >
            {hasPickerValue ? (
              <>
                <span className="value-field-with-picker__display-value">{displayValue}</span>
                <div className="value-field-with-picker__actions">
                  <ClearButton onClick={handleClear} />
                </div>
              </>
            ) : (
              <>
                <div className="value-field-with-picker__editor-wrap">
                  <TiptapValueField embedded editable={editable} />
                </div>
                <div className="value-field-with-picker__actions">
                  {fieldType === 'date' && <DatePickerButton {...pickerProps} />}
                  {fieldType === 'boolean' && <BooleanPickerButton {...pickerProps} value={value} />}
                  {fieldType === 'enum' && (
                    <EnumPickerButton
                      {...pickerProps}
                      options={resolvedOptions}
                      optionsLoader={optionsLoader}
                      onOptionsLoaded={setLoadedOptions}
                      value={value}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {hasPickerValue && (
          <div className="value-field-with-picker__submit-row">
            <span className="value-field-with-picker__spacer" />
            <button type="button" className="value-field-with-picker__submit" onClick={handlePickerSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
      {savedOutput != null && savedOutput !== '' && (
        <div className="value-field-with-picker__output">
          <div className="value-field-with-picker__output-label">Output</div>
          {savedOutput}
        </div>
      )}
    </div>
  );
}
