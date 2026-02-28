import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import TextField from '@mui/material/TextField';

export default function DateInputField({ data, label = 'Date', defaultValue, min, max }) {
  const parseInitial = (val) => {
    if (val == null) return '';
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    const d = val instanceof Date ? val : new Date(val);
    return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
  };
  const [value, setValue] = React.useState(
    data?.value != null ? parseInitial(data.value) : (defaultValue != null ? parseInitial(defaultValue) : '')
  );

  return (
    <div style={{ width: 232, padding: 8 }} className="nodrag">
      <Handle type="target" position={Position.Top} />

      <TextField
        fullWidth
        size="small"
        type="date"
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        InputLabelProps={{ sx: { fontSize: '0.8rem' } }}
        inputProps={{ min, max }}
        InputProps={{ sx: { '& input': { fontSize: '0.8rem' } } }}
      />

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
