import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EnumInputField({ data, options = [], label = 'Select', embedded = false }) {
  const firstValue = options.length > 0 ? options[0].value : '';
  const [value, setValue] = React.useState(data?.value ?? firstValue);

  return (
    <div style={{ width: 232, padding: 8, display: 'flex', alignItems: 'center', gap: 8 }} className="nodrag">
      {!embedded && <Handle type="target" position={Position.Top} />}

      <label style={{ fontSize: '0.8rem', minWidth: 48, flexShrink: 0 }}>{label}</label>
      <FormControl fullWidth size="small" sx={{ flex: 1 }}>
        <Select
          value={value}
          displayEmpty
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
          sx={{
            borderRadius: '12px',
            '& .MuiSelect-select': { fontSize: '0.8rem' },
            '& fieldset': { borderRadius: '12px' },
            '& .MuiOutlinedInput-root': { height: 40 }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                width: 300,
                left: 32
              }
            }
          }}
        >
          {options.map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value} sx={{ fontSize: '0.8rem' }}>
              {opt.label ?? opt.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {!embedded && <Handle type="source" position={Position.Bottom} id="a" />}
    </div>
  );
}
