import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CheckIcon from '@mui/icons-material/Check';

export default function EnumInputField({ data, options = [], label = 'Select', embedded = false }) {
  const firstValue = options.length > 0 ? options[0].value : '';
  const [value, setValue] = React.useState(data?.value ?? firstValue);

  return (
    <div className="enum-input-field nodrag">
      {!embedded && <Handle type="target" position={Position.Top} />}

      <label className="enum-input-field__label">{label}</label>
      <FormControl fullWidth size="small" className="enum-input-field__control">
        <Select
          value={value}
          displayEmpty
          variant="outlined"
          onChange={(e) => setValue(e.target.value)}
          MenuProps={{
            PaperProps: {
              className: 'enum-input-field__menu',
              sx: { left: 32 }
            }
          }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <MenuItem
                key={String(opt.value)}
                value={opt.value}
                selected={isSelected}
                className="enum-input-field__menu-item"
              >
                <span className="enum-input-field__menu-item-label">{opt.label ?? opt.value}</span>
                {isSelected && <CheckIcon sx={{ fontSize: 18, color: '#1a1a1a' }} />}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {!embedded && <Handle type="source" position={Position.Bottom} id="a" />}
    </div>
  );
}
