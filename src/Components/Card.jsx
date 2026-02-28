import Card from '@mui/material/Card';
import { Handle, Position } from '@xyflow/react';
import InputSelectField from './InputSelectField';
import InputTextField from './InputTextField';
import BooleanInputField from './BooleanInputField';
import DateInputField from './DateInputField';
import EnumInputField from './EnumInputField';

const enumOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

export default function CardForm() {
  return (
    <div style={{ width: 280 }}>
      <Handle type="target" position={Position.Top} />

      <Card sx={{ p: 2 }}>
        <h3>Test</h3>

        <div className="nodrag">
          <InputSelectField />
          <BooleanInputField />
          <DateInputField />
          <EnumInputField options={enumOptions} label="Priority" />
        </div>
      </Card>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}