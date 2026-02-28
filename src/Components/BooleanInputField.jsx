import * as React from 'react';
import { Handle, Position } from '@xyflow/react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function BooleanInputField({ data, label = 'Boolean', defaultValue = false }) {
  const [value, setValue] = React.useState(data?.value ?? defaultValue);

  return (
    <div style={{ width: 232, padding: 8 }} className="nodrag">
      <Handle type="target" position={Position.Top} />

      <FormControlLabel
        control={
          <Switch
            checked={!!value}
            onChange={(e) => setValue(e.target.checked)}
            size="small"
          />
        }
        label={label}
        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.8rem' } }}
      />

      <Handle type="source" position={Position.Bottom} id="a" />
    </div>
  );
}
