import { useRef, useState } from 'react';
import { formatDisplayValue } from '../lib/valueFormatters';

/**
 * Hook for ValueFieldWithPicker: options loading, display value, submit flow.
 */
export function useValueFieldWithPicker({
  fieldType,
  fieldOptions = [],
  optionsLoader,
  value,
  onValueChange,
  disabled = false
}) {
  const valueContainerRef = useRef(null);
  const [loadedOptions, setLoadedOptions] = useState([]);
  const [savedOutput, setSavedOutput] = useState(null);

  const resolvedOptions = optionsLoader ? loadedOptions : fieldOptions;
  const hasPickerValue = ['date', 'boolean', 'enum'].includes(fieldType) && value != null && value !== '';
  const displayValue = formatDisplayValue(fieldType, value, resolvedOptions);
  const fieldModifier = disabled ? 'disabled' : hasPickerValue ? 'readonly' : 'editing';

  const handlePickerSubmit = () => {
    if (hasPickerValue) {
      setSavedOutput(displayValue);
      onValueChange?.(null);
    }
  };

  const handleClear = () => onValueChange?.(null);

  return {
    valueContainerRef,
    setLoadedOptions,
    resolvedOptions,
    hasPickerValue,
    displayValue,
    fieldModifier,
    savedOutput,
    handlePickerSubmit,
    handleClear
  };
}
