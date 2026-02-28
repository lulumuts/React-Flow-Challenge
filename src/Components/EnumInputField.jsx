import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function EnumInputField({ data, options = [], label = 'Select' }) {
  const firstValue = options.length > 0 ? options[0].value : '';
  const [value, setValue] = React.useState(data?.value ?? firstValue);

  return (
    <div style={{ width: 232, padding: 8 }} className="nodrag">
      <Handle type="target" position={Position.Top} />

      <FormControl fullWidth size="small">
        <InputLabel sx={{ fontSize: '0.8rem' }}>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(e) => setValue(e.target.value)}
          MenuProps={{
            PaperProps: {
              sx: {
                width: 300,
                left: 32
              }
            }
          }}
          sx={{ '& .MuiSelect-select': { fontSize: '0.8rem' } }}
        >
          {options.map((opt) => (
            <MenuItem key={String(opt.value)} value={opt.value} sx={{ fontSize: '0.8rem' }}>
              {opt.label ?? opt.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
