import { useState, useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { FIELD_OPTIONS, EMPTY_OPTION } from '../lib/cardFieldOptions';

const NODE_OFFSET_Y = 360;

export function useCardForm(id) {
  const { getNode, addNodes, addEdges } = useReactFlow();
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

  const handleFieldChange = useCallback((nextField) => {
    setSelectedField(nextField);
    setValue(null);
  }, []);

  const handleAddNode = useCallback(() => {
    const currentNode = getNode(id);
    if (!currentNode) return;
    const newNodeId = `n${Date.now()}`;
    addNodes([
      {
        id: newNodeId,
        type: 'cardForm',
        position: { x: currentNode.position.x, y: currentNode.position.y + NODE_OFFSET_Y },
        data: { label: `Node ${newNodeId}` },
        deletable: true,
        dragHandle: '.card-drag-handle'
      }
    ]);
    addEdges([
      {
        id: `${id}-${newNodeId}`,
        source: id,
        sourceHandle: 'a',
        target: newNodeId,
        type: 'custom-edge',
        label: 'connects with',
        style: { stroke: '#8350cb', strokeWidth: 3 }
      }
    ]);
  }, [id, getNode, addNodes, addEdges]);

  return {
    selectedField,
    setSelectedField,
    value,
    setValue,
    selectOptions,
    fieldType,
    fieldOptions,
    optionsLoader,
    hasFieldSelected,
    editable,
    handleFieldChange,
    handleAddNode
  };
}
