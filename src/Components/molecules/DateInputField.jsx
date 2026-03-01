import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import TextField from '@mui/material/TextField';

export default function DateInputField({ data, label = 'Date', defaultValue, min, max, embedded = false }) {
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
    <div style={{ width: 232, padding: 8, display: 'flex', alignItems: 'center', gap: 8 }} className="nodrag">
      {!embedded && <Handle type="target" position={Position.Top} />}

      <label style={{ fontSize: '0.8rem', minWidth: 48, flexShrink: 0, opacity: 0.7 }}>{label}</label>
      <TextField
        fullWidth
        size="small"
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ min, max }}
        InputProps={{ sx: { '& input': { fontSize: '0.8rem' } } }}
        sx={{
          flex: 1,
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            height: 40
          }
        }}
      />

      {!embedded && <Handle type="source" position={Position.Bottom} id="a" />}
    </div>
  );
}
